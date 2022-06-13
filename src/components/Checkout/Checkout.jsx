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
  const [buyerData, setBuyerData] = useState({
    name:"",
    lastName:"",
    Address:"",
    tel:"",
    email:"",
    emailConfirm:"",
    CreditCard:"",
    secretCardNumber:""
  })
  // const [buttonDisabled,setButtonDisabled] = useState(true)
  const ordersCollection = collection(db, "orders");

  
  const order = {
    buyer: buyerData,
    date: new Date().toLocaleString(),
    Cart: [...cart],
    total: total,
    Status:"Generado"
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
  const sendOrder = async (e) => {
    e.preventDefault();
  
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

  };


  function ButtonTemp ({buttonDisabled,text,onClick,variant,type,className}) {
  
    return (<Button  variant={variant}  className={className} type={type }onClick={onClick} disabled={buttonDisabled}>{text}</Button>)
}

  return (
    <>
      <Modal show="true">
        <Modal.Header>
          <Modal.Title>Confirmar orden</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form ref={form} onSubmit={sendOrder} >
            <Form.Group className="mb-3" controlId="Name">
              <Form.Control
                type="text"
                name="name"
                placeholder="Nombre"
                autoFocus
                onChange={handleChange}
            required  />
            </Form.Group>
            <Form.Group className="mb-3" controlId="lastName">
              <Form.Control
                type="text"
                name="lastName"
                placeholder="Apellido"
                autoFocus
                onChange={handleChange}
                required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="address">
              <Form.Control
                type="text"
                name="Address"
                placeholder="Direccion"
                autoFocus
                onChange={handleChange}
                required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="tel">
              <Form.Control
                type="number"
                name="tel"
                placeholder="Telefono"
                autoFocus
                onChange={handleChange}
                required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Control
                type="email"
                name="email"
                placeholder="Email"
                autoFocus
                onChange={handleChange}
                required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="emailConfirm">
              <Form.Control
                type="email"
                name="emailConfirm"
                placeholder="Confirmacion E-mail"
                autoFocus
                onChange={handleChange}
                required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="creditCard">
              <Form.Control
                type="number"
                name="CreditCard"
                placeholder="Tarjeta de Credito/Debito "
                autoFocus
                onChange={handleChange}
                required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="codSecCreditCard">
              <Form.Control
                type="password"
                name="secretCardNumber"
                placeholder="Codigo de seguridad"
                autoFocus
                onChange={handleChange}
                required/>
            </Form.Group> 
            <ButtonTemp  className="btnVolver" type="button" onClick={handleClose} text="Volver" /> 
            <ButtonTemp  className="addToCart" type={"submit"} text="Comprar" />
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
