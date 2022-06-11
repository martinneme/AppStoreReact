
import Item from "../Item/Item"

export default function ItemList({listProducts}) {


  return (
    <div className="Products">
      {listProducts.map((products) => {
        return <Item item={products} key={products.id} />;
      })}
     
    </div>
  );
}
