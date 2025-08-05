import TabPanel from "@mui/lab/TabPanel";
import { Box, Stack } from "@mui/material";
import React from "react";

export default function PausedOrders() {
  return (
    <TabPanel value="3">
      <Stack>
        
        
        {[1, 2].map((ele, index) => {
          return (
             <Box></Box>
          )
        }) }



      </Stack>
    </TabPanel>
  );
}