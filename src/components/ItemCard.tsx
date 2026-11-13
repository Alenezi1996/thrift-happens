import { useState } from "react";
import type { ClothingProduct } from "../data/data";

interface ItemCardProps {
  product: ClothingProduct;
  onAddToCheckout: (productId: number, selectedQuantity: number) => void;
}

export default function ItemCard({ product, onAddToCheckout }: ItemCardProps) {
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  function increaseQuantity() {
    if (selectedQuantity < product.quantity) {
      setSelectedQuantity(selectedQuantity + 1);
    }
  }

  function decreaseQuantity() {
    if (selectedQuantity > 0) {
      setSelectedQuantity(selectedQuantity - 1);
    }
  }
  function handleAddToCheckout() {
    if (selectedQuantity > 0 && selectedQuantity <= product.quantity) {
      onAddToCheckout(product.id, selectedQuantity);
      setSelectedQuantity(0);
    }
  }
  return (
    <div>
      <div>
        <button onClick={decreaseQuantity} disabled={selectedQuantity === 0}>
          -
        </button>

        <span>{selectedQuantity}</span>

        <button
          onClick={increaseQuantity}
          disabled={selectedQuantity >= product.quantity}
        >
          +
        </button>
      </div>
      <img src={product.image} alt={product.name} width="150" />
      <h3>{product.name}</h3>
      <p>Fit: {product.fit}</p>
      <p>Category: {product.category}</p>
      <p>Color: {product.color}</p>
      <p>Description: {product.description}</p>
      <p>Size: {product.size}</p>
      <p>Price: ${product.price.toFixed(2)}</p>
      <p>Avialable Stock: {product.quantity}</p>
      <button
        onClick={handleAddToCheckout}
        disabled={selectedQuantity === 0 || product.quantity === 0}
      >
        Add to Checkout
      </button>
    </div>
  );
}
