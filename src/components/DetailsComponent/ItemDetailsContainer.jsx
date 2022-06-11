import { useState, useEffect } from "react";
import ItemDetails from "./ItemDetails";
import SpinnerLoading from "../Spinner/Spinner";
import { useParams } from "react-router-dom";
import { getFirestore, doc ,getDoc} from "firebase/firestore";

export default function ItemDetailsContainer() {
  const [ProductDetail, setProductDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);

    const db = getFirestore();
    const productRef = doc(db, "products", id);
    getDoc(productRef).then((snapshot) => {
      setProductDetail({ id: snapshot.id, ...snapshot.data() });
      ProductDetail && setLoading(false)
    });
  }, [id]);

  return (
    <>
      {loading ? (
        <SpinnerLoading />
      ) : (
        <ItemDetails productDetail={ProductDetail} />
      )}
    </>
  );
}
