import React from "react";
import { Order } from "../../interfaces/order.interface";
import { Chip, Typography, Paper, Grid } from "@mui/material";

interface OrderDetailsProps {
  order: Order | null;
}

const OrderDetailsComponent: React.FC<OrderDetailsProps> = ({ order }) => {
  return (
    <>
      <Paper style={{ padding: "20px", margin: "20px" }} elevation={3}>
        <Typography variant="h5" gutterBottom>
          Order Details
        </Typography>
        {order && (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6">Order ID: {order.id}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  Total Amount: {order.totalAmount}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Status:</Typography>
                <Chip
                  label={order.status}
                  color={order.status === "confirmed" ? "success" : "default"}
                  style={{ marginRight: "8px" }}
                />
              </Grid>
            </Grid>
          </>
        )}
      </Paper>
    </>
  );
};

export default OrderDetailsComponent;
