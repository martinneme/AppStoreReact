import { useContext, useEffect, useState } from "react";
import { Button} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { cartContext } from "../../context/CartContext";

export default function CartComponent() {
  const [countItemCart, setcountItemCart] = useState(0);
  const { countCart } = useContext(cartContext);
  const nav = useNavigate();

  useEffect(() => {
   countCart > 0 ? setcountItemCart(countCart) : setcountItemCart(0);
  }, [countCart]);

  return (
    <Button className="cartClass" variant="light" onClick={() => nav("/cart")}>
          <img src="../img/cart.svg" className="cartImage" alt="cart" />
      <span  className="badgeClass" style={{ display: countCart === 0 && "none" }}>
        {countItemCart}
      </span>
    </Button>
  );
}
