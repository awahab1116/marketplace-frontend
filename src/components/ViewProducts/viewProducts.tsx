// src/components/ViewProducts.tsx
import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Paper,
  IconButton,
  Badge,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CartDialog from "../../components/Cart/cart";
import { viewProducts } from "../../Api/viewProducts";
import { Product } from "../../interfaces/product.interface";

// interface Product {
//   id: number;
//   name: string;
//   image: string;
//   description: string;
// }

// const productData: Product[] = [
//   {
//     id: 1,
//     name: "Product 1",
//     image: "https://placekitten.com/200/300",
//     description: "Description of Product 1",
//   },
//   {
//     id: 2,
//     name: "Product 2",
//     image: "https://placekitten.com/200/301",
//     description: "Description of Product 2",
//   },
//   // Add more product data as needed
// ];

const ViewProducts: React.FC = () => {
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
    <div>
      <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h4" component="div" gutterBottom>
          Featured Products
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Explore our collection of featured products.
        </Typography>
      </Paper>
      <Grid container spacing={2}>
        {productList &&
          productList.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardMedia
                  component="img"
                  alt={product.name}
                  style={{ height: "140px", objectFit: "cover" }}
                  image={
                    product.image
                      ? product.image
                      : "https://placekitten.com/200/300"
                  }
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                  <IconButton onClick={() => addToCart(product)}>
                    {cartItems.some((item) => item.id === product.id) ? (
                      <ShoppingCartIcon />
                    ) : (
                      <AddShoppingCartIcon />
                    )}
                  </IconButton>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
      <div style={{ position: "fixed", top: "10px", right: "10px" }}>
        <IconButton onClick={openCartDialog}>
          <Badge badgeContent={cartItems.length} color="primary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </div>
      <CartDialog
        open={isCartDialogOpen}
        onClose={closeCartDialog}
        cartItems={cartItems}
      />
    </div>
  );
};

export default ViewProducts;
