import { createMuiTheme, Divider, ThemeProvider } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./App.css";
import InputCard from "./components/inputCard";
import MessageCard from "./components/messageCard";
import db from "./firebase";

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
  const [name, setName] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [text, setText] = useState<string>("");

  useEffect(() => {
    (async () => {
      const messagesDatabase = await getDocs(collection(db, "messages"));
      const messages: Messages = { messages: [] };
      messagesDatabase.forEach((doc) => {
        console.log(doc.id, doc.data());
        messages.messages.push(doc.data() as unknown as Message);
      });
      setState(messages);
    })();
  }, []);

  return state ? (
    <>
      <ThemeProvider theme={theme}>
        <div style={{ backgroundColor: "#ebf0f0" }}>
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
            <div style={{ height: "64px" }} />
          </Page>
        </div>
      </ThemeProvider>
    </>
  ) : (
    <div>{JSON.stringify(state)}</div>
  );
}

export default App;
