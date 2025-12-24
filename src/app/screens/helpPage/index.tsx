import React from "react";
import {
  Box,
  Container,
  Stack,
  Tabs,
  Typography,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";

import "../../../css/help.css";
import { faq } from "../../../lib/data/faq";
import { terms } from "../../../lib/data/terms";

const HelpPage: React.FC = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="help-page">
      <Container className="help-container">
        <TabContext value={value}>
          <Box className="help-menu">
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="help tabs"
                className="table_list"
              >
                <Tab label="TERMS" value="1" />
                <Tab label="FAQ" value="2" />
                <Tab label="CONTACT" value="3" />
              </Tabs>
            </Box>
          </Box>

          <Stack className="help-main-content">
            {/* TERMS */}
            <TabPanel value="1">
              <Stack className="rules-box">
                <Box className="rules-frame">
                  {terms.map((item, index) => (
                    <p key={index}>{item}</p>
                  ))}
                </Box>
              </Stack>
            </TabPanel>

            {/* FAQ */}
            <TabPanel value="2">
              <Stack className="accordion-menu">
                {faq.map((item, index) => (
                  <Accordion key={index}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>{item.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>{item.answer}</Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Stack>
            </TabPanel>

            {/* CONTACT */}
            <TabPanel value="3">
              <Stack className="admin-letter-box">
                <Stack className="admin-letter-container">
                  <Box className="admin-letter-frame">
                    <span>Contact us!</span>
                    <p>Fill out below form to send a message!</p>
                  </Box>

                  <form className="admin-letter-frame">
                    <div className="admin-input-box">
                      <label>Your name</label>
                      <input
                        type="text"
                        name="memberNick"
                        placeholder="Type your name here"
                      />
                    </div>

                    <div className="admin-input-box">
                      <label>Your email</label>
                      <input
                        type="email"
                        name="memberEmail"
                        placeholder="Type your email here"
                      />
                    </div>

                    <div className="admin-input-box">
                      <label>Message</label>
                      <textarea name="memberMsg" placeholder="Your message" />
                    </div>

                    <Box display="flex" justifyContent="flex-end" mt={3}>
                      <Button type="submit" variant="contained">
                        Send
                      </Button>
                    </Box>
                  </form>
                </Stack>
              </Stack>
            </TabPanel>
          </Stack>
        </TabContext>
      </Container>
    </div>
  );
};

export default HelpPage;
