import TabPanel from "@mui/lab/TabPanel";
import { Box, Button, Stack } from "@mui/material";
import React from "react";

export default function PausedOrders() {
  return (
    <TabPanel value="1">
      <Stack>
        {[1, 2, 3].map((ele, index) => {
          return (
            <Box key={index} className="order-main-box">
              <Box className="order-box-scroll">
                {[1, 2, 3].map((ele2, index2) => {
                  return (
                    <Box className="order-wrapper">
                      <Box key={index2} className="orders-name-price">
                        <img
                          src={"/img/lavash.webp"}
                          alt="lavash"
                          className="order-dish-img"
                        />
                        <p className="title-dish">Lavash</p>
                      </Box>

                      <Box className="price-box">
                        <p>$9</p>
                        <img src="/icons/close.svg" alt="" />
                        <p>2</p>
                        <img src="/icons/pause.svg" alt="" />
                        <p style={{ marginLeft: "15px" }}>$24</p>
                      </Box>
                    </Box>
                  );
                })}
                <Box className="total-calculate-box">
                  <p className="product-total-name">Product Price</p>
                  <p className="product-prices">$60</p>
                  <img src="/icons/plus.svg" alt="" />
                  <p className="product-total-name">Delivery Cost</p>
                  <p className="product-prices">$5</p>
                  <img src="/icons/pause.svg" alt="" />
                  <p className="product-total-name">Total</p>
                  <p className="product-prices">$65</p>
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

        {false && (
          <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
            <img
              src="/icons/noimage-list.svg"
              style={{ width: 300, height: 300 }}
            />
          </Box>
        )}
      </Stack>
    </TabPanel>
  );
}
