import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { CssVarsProvider } from "@mui/joy/styles";

const activeUsers = [
  { memberNick: "Martin", memberImage: "/img/martin.webp" },
  { memberNick: "Justin", memberImage: "/img/justin.webp" },
  { memberNick: "Rose", memberImage: "/img/rose.webp" },
  { memberNick: "Nusret", memberImage: "/img/buster.webp" },
];

export default function ActiveUsers() {
  return (
    <div className="active-users-frame">
      <Container>
        <Stack className="main">
          <Box className="category-title">Popular Dishes</Box>
          <Stack className="cards-frame">
            {activeUsers.length !== 0 ? (
              activeUsers.map((ele, index) => {
                return <CssVarsProvider>
                  
                </CssVarsProvider>;
              })
            ) : (
              <Box className="no-data">New products are not available</Box>
            )}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
