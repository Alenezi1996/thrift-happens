import type { ClothingProduct } from "../data/data";
import CheckoutCard from "./checkoutCard";

interface CheckoutContainerProps {
  checkoutList: ClothingProduct[];
  onRemoveFromCheckout: (productId: number) => void;
  onEmptyCheckout: () => void;
}

export default function CheckoutContainer({
  checkoutList,
  onRemoveFromCheckout,
  onEmptyCheckout,
}: CheckoutContainerProps) {
  const grandTotal = checkoutList.reduce(
    (total, product) => total + product.price * product.itemQuantity,
    0,
  );

  return (
    <div>
      <h2>Checkout</h2>

      {checkoutList.length === 0 ? (
        <p>Cart Empty</p>
      ) : (
        checkoutList.map((product) => (
          <CheckoutCard
            key={product.id}
            product={product}
            onRemoveFromCheckout={onRemoveFromCheckout}
          />
        ))
      )}

      <h3>Grand Total: ${grandTotal.toFixed(2)}</h3>

      <button onClick={onEmptyCheckout} disabled={checkoutList.length === 0}>
        Empty Checkout
      </button>
    </div>
  );
}
