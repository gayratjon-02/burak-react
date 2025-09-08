import { SyntheticEvent, useEffect, useState } from "react";
import { Box, Container, Stack } from "@mui/material";
import FinsihedOrders from "./FinishedOrders";
import ProcessOrders from "./ProcessOrders";
import PausedOrders from "./PausedOrders";
import { TabContext } from "@mui/lab";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setPausedOrders, setProcessOrders, setFinishedOrders } from "./slice";
import { Order, OrderInquiry } from "../../../lib/types/order";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/orderService";
import { useGlobals } from "../../hooks/useGlobals";
import "../../../css/order.css";

/**  REDUX SLICE & SELECTOR  **/

const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});

export default function OrdersPage() {
  const { setPausedOrders, setProcessOrders, setFinishedOrders } =
    actionDispatch(useDispatch());
  const { orderBuilder } = useGlobals();
  const [value, setValue] = useState("1");

  const [orderInquiry, setOrderInquiry] = useState<OrderInquiry>({
    page: 1,
    limit: 5,
    orderStatus: OrderStatus.PAUSE,
  });

  useEffect(() => {
    const order = new OrderService();

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PAUSE })
      .then((data) => setPausedOrders(data))
      .catch((err) => console.log(err));

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PROCESS })
      .then((data) => setProcessOrders(data))
      .catch((err) => console.log(err));

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.FINISH })
      .then((data) => setFinishedOrders(data))
      .catch((err) => console.log(err));
  }, [orderInquiry, orderBuilder]);

  /** HANDLERS **/

  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="order-page">
      <Container className="order-container">
        <Stack className="order-left">
          <TabContext value={value}>
            <Box className="order-nav-frame">
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  className="table_list"
                >
                  <Tab label="PAUSED ORDERS" value={"1"} />
                  <Tab label="PROCESS ORDERS" value={"2"} />
                  <Tab label="FINISHED ORDERS" value={"3"} />
                </Tabs>
              </Box>
            </Box>

            <Stack className="order-main-content">
              <PausedOrders setValue={setValue} />
              <ProcessOrders setValue={setValue} />
              <FinsihedOrders />
            </Stack>
          </TabContext>
        </Stack>

        <Stack className="order-right">
          <Stack className="order-right-top">
            <Stack className="order-img-box">
              <img className="main-img" src="/img/justin.webp" width={"100"} />
              <AccountCircleIcon className="account-icon" />
              <span>Justin</span>
              <h1>User</h1>
            </Stack>
            <Stack className="order-location-box">
              <div className="location-line"></div>
              <Stack className="location-box">
                <LocationOnIcon className="location-icon" />
                <p>South Korea, Busan</p>
              </Stack>
            </Stack>
          </Stack>
          <Stack className="order-right-bott">
            <Stack className="card-detail-wrapper">
              <input
                type="number"
                placeholder="Card number : 5243 4090 2002 7495"
              />
              <Stack className="card-info">
                <input type="text" placeholder="MM / YY" />
                <input type="number" placeholder="CVV : 010" />
              </Stack>
              <input type="text" name="" id="" placeholder="Justin Robertson" />
            </Stack>

            <Stack className="card-images">
              <a href="#">
                <img src="/icons/western-card.svg" alt="" />
              </a>
              <a href="#">
                <img src="/icons/master-card.svg" alt="" />
              </a>
              <a href="#">
                <img src="/icons/paypal-card.svg" alt="" />
              </a>
              <a href="#">
                <img src="/icons/visa-card.svg" alt="" />
              </a>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
