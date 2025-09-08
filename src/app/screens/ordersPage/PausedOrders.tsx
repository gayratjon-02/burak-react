import TabPanel from "@mui/lab/TabPanel";
import { Box, Button, Stack } from "@mui/material";
import React from "react";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { serverApi } from "../../../lib/config";
import { retrievePausedOrders } from "./selector";
import { Order, OrderItem } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";

/**  REDUX SLICE & SELECTOR  **/

const pausedOrdersRetriever = createSelector(
  retrievePausedOrders,
  (pausedOrders) => ({ pausedOrders })
);

export default function PausedOrders() {
  const { pausedOrders } = useSelector(pausedOrdersRetriever);

  return (
    <TabPanel value="1">
      <Stack>
        {pausedOrders?.map((order: Order) => {
          return (
            <Box key={order._id} className="order-main-box">
              <Box className="order-box-scroll">
                {order?.orderItems?.map((item: OrderItem) => {
                  const product: Product = order.productData.filter(
                    (ele: Product) => item.productId === ele._id
                  )[0];
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  return (
                    <Box className="order-wrapper">
                      <Box key={item._id} className="orders-name-price">
                        <img
                          src={imagePath}
                          alt="lavash"
                          className="order-dish-img"
                        />
                        <p className="title-dish">{product.productName}</p>
                      </Box>

                      <Box className="price-box">
                        <p>${item.itemPrice}</p>
                        <img src="/icons/close.svg" alt="" />
                        <p>{item.itemQuantity} </p>
                        <img src="/icons/pause.svg" alt="" />
                        <p style={{ marginLeft: "15px" }}>
                          ${item.itemQuantity * item.itemPrice}{" "}
                        </p>
                      </Box>
                    </Box>
                  );
                })}
                <Box className="total-calculate-box">
                  <p className="product-total-name">Product Price</p>
                  <p className="product-prices">
                    ${order.orderTotal - order.orderDelivery}
                  </p>
                  <img src="/icons/plus.svg" alt="" />
                  <p className="product-total-name">Delivery Cost</p>
                  <p className="product-prices">${order.orderDelivery}</p>
                  <img src="/icons/pause.svg" alt="" />
                  <p className="product-total-name">Total</p>
                  <p className="product-prices">${order.orderTotal} </p>
                  <Button
                    className="product-cancel-butt"
                    variant="contained"
                    color="secondary"
                  >
                    Contained
                  </Button>
                  <Button className="product-payment-butt" variant="contained">
                    Contained
                  </Button>
                </Box>
              </Box>
            </Box>
          );
        })}

        {!pausedOrders ||
          (pausedOrders.length === 0 && (
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"center"}
            >
              <img
                src="/icons/noimage-list.svg"
                style={{ width: 300, height: 300 }}
              />
            </Box>
          ))}
      </Stack>
    </TabPanel> 
  );
}
