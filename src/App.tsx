import { useState } from "react";
import { products } from "./data/data";
import type { ClothingProduct } from "./data/data";
import ItemsContainer from "./components/ItemsContainer";
import CheckoutContainer from "./components/checkoutContainer";

export default function App() {
  const [productsList, setProductsList] = useState<ClothingProduct[]>(products);

  const [checkoutList, setCheckoutList] = useState<ClothingProduct[]>([]);

  // Add selected products to checkout
  function addToCheckout(productId: number, selectedQuantity: number) {
    const product = productsList.find((item) => item.id === productId);

    if (!product || selectedQuantity <= 0) {
      return;
    }

    if (selectedQuantity > product.quantity) {
      return;
    }

    // Reduce available stock
    setProductsList((previousProducts) =>
      previousProducts.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity - selectedQuantity }
          : item,
      ),
    );

    // Add product or update existing checkout quantity
    setCheckoutList((previousCheckout) => {
      const existingItem = previousCheckout.find(
        (item) => item.id === productId,
      );

      if (existingItem) {
        return previousCheckout.map((item) =>
          item.id === productId
            ? {
                ...item,
                itemQuantity: item.itemQuantity + selectedQuantity,
              }
            : item,
        );
      }

      return [
        ...previousCheckout,
        { ...product, itemQuantity: selectedQuantity },
      ];
    });
  }

  // Remove a product and restore its stock
  function removeFromCheckout(productId: number) {
    const product = checkoutList.find((item) => item.id === productId);

    if (!product) {
      return;
    }

    setProductsList((previousProducts) =>
      previousProducts.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: item.quantity + product.itemQuantity,
            }
          : item,
      ),
    );

    setCheckoutList((previousCheckout) =>
      previousCheckout.filter((item) => item.id !== productId),
    );
  }

  // Empty checkout and restore all reserved stock
  function emptyCheckout() {
    setProductsList((previousProducts) =>
      previousProducts.map((product) => {
        const cartItem = checkoutList.find((item) => item.id === product.id);

        if (cartItem) {
          return {
            ...product,
            quantity: product.quantity + cartItem.itemQuantity,
          };
        }

        return product;
      }),
    );

    setCheckoutList([]);
  }

  return (
    <div>
      <h1>Thrift Happens</h1>

      <ItemsContainer
        productsList={productsList}
        onAddToCheckout={addToCheckout}
      />

      <CheckoutContainer
        checkoutList={checkoutList}
        onRemoveFromCheckout={removeFromCheckout}
        onEmptyCheckout={emptyCheckout}
      />
    </div>
  );
}
