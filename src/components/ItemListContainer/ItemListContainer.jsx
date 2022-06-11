import ItemList from "../ItemList/ItemList";
import React, { useEffect, useState } from "react";
import SpinnerLoading from "../Spinner/Spinner";
import { useParams } from "react-router-dom";
import {db} from '../../Firebase/config'
import {
  
  getDocs,
  collection,
  where,
  query,
} from "firebase/firestore";

export default function ItemListContainer() {
  const [listProducts, setListProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    

    if (id) {
      const q = query(collection(db, "products"), where("category", "==", id));
      getDocs(q).then((snapshots) => {
        if (snapshots.size === 0) {
          console.log("No hay productos");
        }
        setListProducts(
          snapshots.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      });
    } else {
      const productsRef = collection(db, "products");
      getDocs(productsRef).then((snapshots) => {
        if (snapshots.size === 0) {
          console.log("No hay productos");
        }
        setListProducts(
          snapshots.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      });
    }
    listProducts && setLoading(false);
  }, [id]);

  return (
    <>
      <div className="BoxProd">
        <label className="sectionTitle">Products</label>
        {loading ? (
          <SpinnerLoading />
        ) : (
          <ItemList listProducts={listProducts} />
        )}
      </div>
    </>
  );
}
