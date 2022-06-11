import { Card, Button, ListGroupItem, ListGroup } from "react-bootstrap";
import ItemCountCart from "../ItemCount/ItemCountCart";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { cartContext } from "../../context/CartContext";

export default function ItemDetails({ productDetail }) {
  const { title, description, descriptionExtend, price, urlImg, stock } =
    productDetail;

  const nav = useNavigate();

  const { addToCart} = useContext(cartContext);
  
  const [enableCount, setEnableCount] = useState(true);
  const [quantity, setQuantity] = useState(0);

  const ClickToAddToCart = (quantity) => {
    addToCart(productDetail,quantity);
    setEnableCount(false);
    setQuantity(quantity);
  };

  

  return (
    <>
      <Card className="CardProdDetail">
        <Card.Body className="CardProdDetailBody">
          <Card.Img
            className="prodDetailsImgStyle"
            src={urlImg}
            alt="Card cap"
          />
          <ListGroup variant="flush bodyDetailCard">
            <Card.Title>{title}</Card.Title>
            <ListGroupItem>{description}</ListGroupItem>
            <ListGroupItem>{descriptionExtend}</ListGroupItem>
            <ListGroupItem>{price}</ListGroupItem>
            <ListGroupItem>
              {enableCount ? (
                <ItemCountCart
                  stock={stock}
                  initial={1}
                  quantity={quantity}
                  setQuantity={setQuantity}
                  ClickToAddToCart={ClickToAddToCart}
                  setEnableCount={setEnableCount}
                />
              ) : (
                <>
                <h6>Se agregó {quantity} producto/s al carrito </h6>
                <Button variant="primary btnVolver" onClick={() => nav(`/cart`)}>
                Finalizar Compra
              </Button>
              </>
              )}
            </ListGroupItem>
          </ListGroup>
        </Card.Body>
        <Card.Footer className="detailsFooter">
          <Button variant="primary btnVolver" onClick={() => nav(`/`)}>
            Volver
          </Button>
        </Card.Footer>
      </Card>
    </>
  );
}
