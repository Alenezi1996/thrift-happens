import type { ClothingProduct } from "../data/data";
import ItemCard from "./ItemCard";

interface ItemsContainerProps {
  productsList: ClothingProduct[];

  onAddToCheckout: (productId: number, selectedQuantity: number) => void;
}

export default function ItemsContainer({
  productsList,
  onAddToCheckout,
}: ItemsContainerProps) {
  return (
    <div>
      <h2>Available Products</h2>

      {productsList.map((product) => (
        <ItemCard
          key={product.id}
          product={product}
          onAddToCheckout={onAddToCheckout}
        />
      ))}
    </div>
  );
}
