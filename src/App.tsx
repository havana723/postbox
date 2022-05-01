import { Card, TextField } from "@mui/material";
import React from "react";
import styled from "styled-components";
import "./App.css";

const Page = styled.div`
  width: min(100vw, 720px);
  margin: 0 auto;
`;

function App() {
  return (
    <>
      <Page>
        <div style={{ height: "120px" }} />
        <Card variant="outlined" style={{ padding: "10px" }}>
          <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        </Card>
      </Page>
    </>
  );
}

export default App;
