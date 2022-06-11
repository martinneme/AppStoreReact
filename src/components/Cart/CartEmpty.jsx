import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function CartEmpty() {
    const nav = useNavigate();
   
   

  return (
    <>
    <Card> 
     <h3>No hay elementos en el carrito</h3>
     <Button variant="primary btnVolver"  onClick={() => nav(`/`)}>Volver al Home</Button>
    </Card>
    </>
  );
}
