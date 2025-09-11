import React from "react";
import { Box, Card, Container, Stack, Typography } from "@mui/material";
import { CssVarsProvider } from "@mui/joy/styles";
import { CardOverflow } from "@mui/joy";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveTopUsers } from "./selector";
import { serverApi } from "../../../lib/config";
import { Member } from "../../../lib/types/member";

/**  REDUX SLICE & SELECTOR  **/

const topUsersRetriever = createSelector(
  retrieveTopUsers,
  (topUsers) => ({ topUsers })
);

 

export default function ActiveUsers() {
  const {topUsers} = useSelector(topUsersRetriever)
  return (
    <div className="active-users-frame">
      <Container>
        <Stack className="main">
          <Box className="category-title">Active User</Box>
          <Stack className="cards-frame">
            {topUsers.length !== 0 ? (
              topUsers.map((member: Member) => {
                const imagePath = `${serverApi}/${member.memberImage}`
                return (
                  <CssVarsProvider>
                    <Card key={member._id} variant="outlined" className="card">
                      <CardOverflow>
                        <img
                          src={imagePath}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                          alt="rasb"
                        />
                      </CardOverflow>

                      <CardOverflow variant="soft" className="product-detail">
                        <Stack className="info">
                          <Stack flexDirection={"row"}>
                            <Typography className="title">
                              {member.memberNick}
                            </Typography>
                          </Stack>
                        </Stack>
                      </CardOverflow>
                    </Card>
                  </CssVarsProvider>
                );
              })
            ) : (
              <Box className="no-data">Active Users are not available</Box>
            )}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
