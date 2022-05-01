import { createMuiTheme, Divider, ThemeProvider } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./App.css";
import InputCard from "./components/inputCard";
import MessageCard from "./components/messageCard";

const baseURL = process.env.REACT_APP_API_ENDPOINT;

export interface Message {
  name: string;
  contact: string;
  text: string;
  deleted: boolean;
  date: Date;
}

export interface Messages {
  messages: Message[];
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ff8989",
    },
  },
  typography: {
    fontFamily: ["Pretendard"].join(","),
  },
});

const Page = styled.div`
  width: min(100vw, 600px);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

function App() {
  const [state, setState] = useState<Messages | null>(null);

  useEffect(() => {
    axios
      .get<Messages>("/messages", { baseURL })
      .then((res) => {
        setState(res.data);
      })
      .catch((err) => {
        setState(null);
        console.log(err);
      });
  }, []);

  return state ? (
    <>
      <ThemeProvider theme={theme}>
        <Page>
          <div style={{ height: "64px" }} />
          <h1 style={{ textAlign: "center" }}>메세지 남기기</h1>
          <InputCard />
          <div style={{ height: "24px" }} />
          <Divider variant="middle" textAlign="center">
            메세지
          </Divider>
          <div style={{ height: "24px" }} />
          {state.messages.map((message) => (
            <MessageCard message={message} />
          ))}
        </Page>
      </ThemeProvider>
    </>
  ) : (
    <div>{JSON.stringify(state)}</div>
  );
}

export default App;
