import { SyntheticEvent, useEffect, useState } from "react";
import { Box, Container, Stack } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { TabContext } from "@mui/lab";

import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { useHistory } from "react-router-dom";

import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinsihedOrders from "./FinishedOrders";

import { setPausedOrders, setProcessOrders, setFinishedOrders } from "./slice";
import { Order, OrderInquiry } from "../../../lib/types/order";
import { OrderStatus } from "../../../lib/enums/order.enum";

import OrderService from "../../services/orderService";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";

import "../../../css/order.css";

/** REDUX ACTIONS */
const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});

export default function OrdersPage() {
  const { setPausedOrders, setProcessOrders, setFinishedOrders } =
    actionDispatch(useDispatch());

  const { orderBuilder, authMember } = useGlobals();
  const history = useHistory();

  const [value, setValue] = useState("1");
  const [orderInquiry, setOrderInquiry] = useState<OrderInquiry>({
    page: 1,
    limit: 5,
    orderStatus: OrderStatus.PAUSE,
  });

  useEffect(() => {
    if (!authMember) {
      history.push("/");
      return;
    }

    const orderService = new OrderService();

    orderService
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PAUSE })
      .then(setPausedOrders)
      .catch(console.error);

    orderService
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PROCESS })
      .then(setProcessOrders)
      .catch(console.error);

    orderService
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.FINISH })
      .then(setFinishedOrders)
      .catch(console.error);
  }, [orderInquiry, orderBuilder, authMember]);

  /** HANDLERS */
  const handleChange = (_: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  if (!authMember) return null;

  return (
    <div className="order-page">
      <Container className="order-container">
        {/* LEFT SIDE */}
        <Stack className="order-left">
          <TabContext value={value}>
            <Box className="order-nav-frame">
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  className="table_list"
                >
                  <Tab label="PAUSED ORDERS" value="1" />
                  <Tab label="PROCESS ORDERS" value="2" />
                  <Tab label="FINISHED ORDERS" value="3" />
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

        {/* RIGHT SIDE */}
        <Stack className="order-right">
          <Stack className="order-right-top">
            <Stack className="order-img-box">
              <img
                className="main-img"
                src={
                  authMember.memberImage
                    ? `${serverApi}/${authMember.memberImage}`
                    : "/icons/default-user.svg"
                }
                width={100}
                alt="user"
              />
              <AccountCircleIcon className="account-icon" />
              <span>{authMember.memberNick}</span>
              <h1>{authMember.memberType}</h1>
            </Stack>

            <Stack className="order-location-box">
              <div className="location-line" />
              <Stack className="location-box">
                <LocationOnIcon className="location-icon" />
                <p>{authMember.memberAddress || "no address"}</p>
              </Stack>
            </Stack>
          </Stack>

          <Stack className="order-right-bott">
            <Stack className="card-detail-wrapper">
              <input type="number" placeholder="Card number" />
              <Stack className="card-info">
                <input type="text" placeholder="MM / YY" />
                <input type="number" placeholder="CVV" />
              </Stack>
              <input type="text" placeholder="Card holder name" />
            </Stack>

            <Stack className="card-images">
              <img src="/icons/western-card.svg" alt="" />
              <img src="/icons/master-card.svg" alt="" />
              <img src="/icons/paypal-card.svg" alt="" />
              <img src="/icons/visa-card.svg" alt="" />
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
