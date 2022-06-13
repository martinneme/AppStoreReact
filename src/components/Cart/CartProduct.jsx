import { Card, Button } from "react-bootstrap";


export default function CartProduct({item,removeItemCart}) {



  return (
    <>
          <Card className="CardItemCart">
            <Card.Img
              className="prodCartView"
              src={item.urlImg}
              alt="Card cap"
            />
            <ul>{item.title}</ul>
            <ul>Precio Unitario: ${item.price}</ul>
            <ul>Cantidad:{item.quantity}</ul>
            <ul>Precio total: ${parseInt(item.price) * item.quantity}</ul>
            <Card className="CardBtnDelete">
              <Button
                className="DeleteItemCartBtn"
                onClick={() => removeItemCart(item.id)}
              >
                X
              </Button>
            </Card>
          </Card>
    </>
  );
}
