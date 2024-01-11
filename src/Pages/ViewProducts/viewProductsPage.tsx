import React, { useState, useEffect } from "react";
import ViewProducts from "../../components/ViewProducts/viewProducts";
import { Product } from "../../interfaces/product.interface";
import { viewProducts } from "../../Api/viewProducts";

const ViewProductsPage: React.FC = () => {
  const [productList, setProductList] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isCartDialogOpen, setIsCartDialogOpen] = useState(false);

  useEffect(() => {
    viewProducts()
      .then((products) => {
        setProductList(products);
      })
      .catch((error) => {});
  }, []);

  const addToCart = (product: Product) => {
    // Check if the product is already in the cart
    const isProductInCart = cartItems.some((item) => item.id === product.id);

    if (!isProductInCart) {
      // If not in the cart, add it
      setCartItems((prevCartItems) => [...prevCartItems, product]);
    } else {
      // If already in the cart, remove it
      setCartItems((prevCartItems) =>
        prevCartItems.filter((item) => item.id !== product.id)
      );
    }
  };

  const openCartDialog = () => {
    setIsCartDialogOpen(true);
  };

  const closeCartDialog = () => {
    setIsCartDialogOpen(false);
  };

  return (
    <ViewProducts
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
