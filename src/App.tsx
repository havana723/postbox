import {
  createMuiTheme,
  Divider,
  Pagination,
  ThemeProvider,
} from "@mui/material";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAt,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./App.css";
import Footer from "./components/footer";
import InputCard from "./components/inputCard";
import MessageCard from "./components/messageCard";
import { db } from "./firebase";

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
  width: min(100%, 600px);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

function App() {
  const [state, setState] = useState<Messages | null>(null);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const PER_PAGE = 5;

  async function getData() {
    const rawMessagesRef = await collection(db, "messages");
    const messagesRef = await query(
      rawMessagesRef,
      where("deleted", "==", false)
    );

    setCount(Math.ceil((await getDocs(messagesRef)).size / PER_PAGE));

    const orderQuery = await query(messagesRef, orderBy("date", "desc"));
    const orderedDocs = await getDocs(orderQuery);
    const lastDoc = orderedDocs.docs[(page - 1) * PER_PAGE];

    const limitQuery = await query(
      orderQuery,
      limit(PER_PAGE),
      startAt(lastDoc)
    );
    const limitedDocs = await getDocs(limitQuery);

    const messages: Messages = { messages: [] };

    limitedDocs.forEach((doc) => {
      messages.messages.push(doc.data() as unknown as Message);
    });

    setState(messages);
  }

  useEffect(() => {
    getData();
  }, [page]);

  return state ? (
    <>
      <ThemeProvider theme={theme}>
        <div style={{ backgroundColor: "#ebf0f0", padding: "4px" }}>
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
            <div style={{ height: "24px" }} />
            <Pagination
              count={count}
              shape="rounded"
              style={{ margin: "0 auto" }}
              onChange={(e, p) => setPage(p)}
            />
            <div style={{ height: "64px" }} />
            <Footer />
          </Page>
        </div>
      </ThemeProvider>
    </>
  ) : (
    <div>{JSON.stringify(state)}</div>
  );
}

export default App;
