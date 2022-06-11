import { useContext, createRef, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { cartContext } from "../../context/CartContext";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { db } from "../../Firebase/config";
import {
  addDoc,
  doc,
  collection,
  writeBatch,
  getDoc
} from "firebase/firestore";

export default function Checkout({ handleClose, total,clearCart }) {
  const { cart } = useContext(cartContext);
  const form = createRef();
  const nav = useNavigate();
  const [buyerData, setBuyerData] = useState()
  const ordersCollection = collection(db, "orders");

  const order = {
    buyer: buyerData,
    date: new Date().toLocaleString(),
    Cart: [...cart],
    total: total,
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBuyerData({ ...buyerData, [name]: value });
  }

  const orderConfirm= (id) =>{
    const MySwal = withReactContent(Swal)
    
    MySwal.fire({
     icon: 'success',
     title: <p>Se genero tu pedido!</p>,
     text:`N°:${id}`,
     confirmButtonColor: '#000000',
     confirmButtonText: 'Volver al Home',
     showCloseButton: true
   }).then((result) => {
    if (result.isConfirmed) {
      clearCart()
      nav(`/`)
    }})
  }
  const sendOrder = async () => {
    if (
      order.buyer.name !== "" &&
      order.buyer.lastName !== "" &&
      order.buyer.Address !== "" &&
      order.buyer.CreditCard !== 0 &&
      order.buyer.secretCardNumber !== 0
    ){
  
      addDoc(ordersCollection, order).then(({ id }) => {
        
        orderConfirm(id)
        form.current.reset();
        handleClose();
      });

      cart.forEach((item) => {
        const batch = writeBatch(db);
        getDoc(doc(db, "products", item.id)).then((snapshot) => {
          if (snapshot.data().stock >= item.quantity) {
            batch.update(doc(db, "products", snapshot.id), {
              stock: snapshot.data().stock - item.quantity,
            });
            return batch.commit();
          }
        });
      });


    } else {
      alert("Debe completar todos los datos");
    }
  };

  return (
    <>
      <Modal show="true">
        <Modal.Header>
          <Modal.Title>Confirmar orden</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form ref={form}>
            <Form.Group className="mb-3" controlId="Name">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder=""
                autoFocus
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="lastName">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                placeholder=""
                autoFocus
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="address">
              <Form.Label>Direccion</Form.Label>
              <Form.Control
                type="text"
                name="Address"
                placeholder=""
                autoFocus
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="creditCard">
              <Form.Label>Tarjeta</Form.Label>
              <Form.Control
                type="text"
                name="CreditCard"
                placeholder=""
                autoFocus
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="codSecCreditCard">
              <Form.Label>Codigo de seguridad</Form.Label>
              <Form.Control
                type="password"
                name="secretCardNumber"
                placeholder=""
                autoFocus
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Volver
          </Button>
          <Button variant="primary" onClick={sendOrder}>
            Comprar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
