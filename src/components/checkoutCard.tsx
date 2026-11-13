import type { ClothingProduct } from "../data/data";

interface CheckoutCardProps {
  product: ClothingProduct;
  onRemoveFromCheckout: (productId: number) => void;
}

export default function CheckoutCard({
  product,
  onRemoveFromCheckout,
}: CheckoutCardProps) {
  return (
    <div>
      <img src={product.image} alt={product.name} width="100" />

      <h3>{product.name}</h3>

      <p>Price: ${product.price.toFixed(2)}</p>
      <p>Quantity: {product.itemQuantity}</p>

      <p>Subtotal: ${(product.price * product.itemQuantity).toFixed(2)}</p>

      <button onClick={() => onRemoveFromCheckout(product.id)}>Remove</button>
    </div>
  );
}
