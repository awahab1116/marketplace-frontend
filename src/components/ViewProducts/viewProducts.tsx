// src/components/ViewProducts.tsx
import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Paper,
  IconButton,
  Badge,
  TextField,
  Box,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CartDialog from "../../components/Cart/cart";
import { Product } from "../../interfaces/product.interface";

interface ViewProductsProps {
  quantity: number[];
  productList: Product[];
  cartItems: Product[];
  isCartDialogOpen: boolean;
  addToCart: (product: Product, quantity: number) => void;
  openCartDialog: () => void;
  closeCartDialog: () => void;
  handleQuantityChange: (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

const ViewProducts: React.FC<ViewProductsProps> = ({
  quantity,
  productList,
  cartItems,
  isCartDialogOpen,
  addToCart,
  openCartDialog,
  closeCartDialog,
  handleQuantityChange,
}) => {
  // const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const newQuantity = parseInt(event.target.value, 10);
  //   setQuantity(isNaN(newQuantity) ? 1 : Math.max(1, newQuantity));
  // };

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
          productList.map((product, index) => (
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
                  <Box display="flex" alignItems="center">
                    <TextField
                      type="number"
                      label="Quantity"
                      variant="outlined"
                      defaultValue={quantity[index]}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleQuantityChange(index, e)
                      }
                      inputProps={{ min: 1, max: product.quantity }}
                      style={{ marginRight: "10px", width: "60px" }}
                    />
                    <IconButton
                      onClick={() => addToCart(product, quantity[index])}
                      color="primary"
                    >
                      {cartItems.some((item) => item.id === product.id) ? (
                        <ShoppingCartIcon />
                      ) : (
                        <AddShoppingCartIcon />
                      )}
                    </IconButton>
                  </Box>
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
