import React, { useState, useEffect } from "react";
import ViewProducts from "../../components/ViewProducts/viewProducts";
import { Product } from "../../interfaces/product.interface";
import { viewProducts } from "../../Api/viewProducts";

const ViewProductsPage: React.FC = () => {
  const [productList, setProductList] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isCartDialogOpen, setIsCartDialogOpen] = useState(false);
  const [quantity, setQuantity] = useState<number[]>([]);

  useEffect(() => {
    viewProducts()
      .then((products) => {
        setQuantity(new Array(10).fill(1));
        setProductList(products);
      })
      .catch((error) => {});
  }, []);

  const addToCart = (product: Product, quantity: number) => {
    // Check if the product is already in the cart
    const isProductInCart = cartItems.some((item) => item.id === product.id);

    if (!isProductInCart) {
      // If not in the cart, add it
      product.quantity = quantity;
      setCartItems((prevCartItems) => [...prevCartItems, product]);
    } else {
      // If already in the cart, remove it
      setCartItems((prevCartItems) =>
        prevCartItems.filter((item) => item.id !== product.id)
      );
    }
  };

  const handleQuantityChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newQuantity = parseInt(event.target.value, 10);
    const updatedQuantity = isNaN(newQuantity) ? 1 : Math.max(1, newQuantity);

    setQuantity((prevQuantity) => {
      const newQuantityArray = [...prevQuantity];
      newQuantityArray[index] = updatedQuantity;
      return newQuantityArray;
    });
  };

  const openCartDialog = () => {
    setIsCartDialogOpen(true);
  };

  const closeCartDialog = () => {
    setIsCartDialogOpen(false);
  };

  return (
    <ViewProducts
      quantity={quantity}
      handleQuantityChange={handleQuantityChange}
      productList={productList}
      cartItems={cartItems}
      isCartDialogOpen={isCartDialogOpen}
      addToCart={addToCart}
      openCartDialog={openCartDialog}
      closeCartDialog={closeCartDialog}
    />
  );
};

export default ViewProductsPage;
