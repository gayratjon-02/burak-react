import { Box, Container, Stack } from "@mui/material";
import FinsihedOrders from "./FinishedOrders";
import ProcessOrders from "./ProcessOrders";
import PausedOrders from "./PausedOrders";
import { SyntheticEvent, useState } from "react";
import { TabContext } from "@mui/lab";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import "../../../css/order.css";

export default function OrdersPage() {
  // hooks

  const [value, setValue] = useState("1");

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
              <PausedOrders />
              <ProcessOrders />
              <FinsihedOrders />
            </Stack>
          </TabContext>
        </Stack>
      </Container>
    </div>
  );
}
