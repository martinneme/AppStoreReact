import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export default function Item({ item }) {

  const nav = useNavigate()

  return (
    <>
      <Card className="CardProd" >
        <Card.Body onClick={()=> nav(`/product/${item.id}`)} >
        <img className="prodImgStyle" src={item.urlImg} alt="Card cap"/>
          <Card.Title>{item.title}</Card.Title>
          <Card.Text>{item.description}</Card.Text>
          <Card.Text>${item.price}</Card.Text>
          <Button variant="primary details" onClick={()=> nav(`/product/${item.id}`)} >Detalles</Button>
          </Card.Body>
          <Card.Footer className="itemFooter">
        </Card.Footer>
      </Card>
    </>
  );
}