// src/components/CartDialog.tsx
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Product } from "../../interfaces/product.interface";
import { placeOrder } from "../../Api/placeOrder";
import { PlaceOrderBody } from "../../interfaces/placeOrderBody.interface";

interface CartDialogProps {
  open: boolean;
  onClose: () => void;
  cartItems: Product[];
}

const CartDialog: React.FC<CartDialogProps> = ({
  open,
  onClose,
  cartItems,
}) => {
  const handlePlaceOrder = async () => {
    const productData: PlaceOrderBody[] = cartItems.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
    }));

    placeOrder(productData)
      .then((stripeCheckoutLink) => {
        window.location.href = stripeCheckoutLink;
      })
      .catch((error) => {});
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Your Cart</DialogTitle>
      <DialogContent>
        <List>
          {cartItems.map((item) => (
            <ListItem key={item.id}>
              <ListItemText
                primary={item.name}
                secondary={`Quantity: ${item.quantity}`}
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} startIcon={<CloseIcon />} color="secondary">
          Close
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePlaceOrder}
          disabled={cartItems.length === 0}
        >
          Place Order
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CartDialog;
