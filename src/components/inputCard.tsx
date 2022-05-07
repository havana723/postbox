import { Button, Card, TextField } from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";

const Cardflex = styled.div`
  display: flex;
  align-content: center;
  justify-content: space-evenly;
  gap: 10px;
  margin: 10px 10px;
`;

const InputCard: React.FC = (props) => {
  const [name, setName] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [text, setText] = useState<string>("");

  async function handleSubmit() {
    if (name == "") alert("이름을 입력해주세요!");
    else if (text == "") alert("내용을 입력해주세요!");
    else {
      const docRef = await addDoc(collection(db, "messages"), {
        name: name,
        contact: contact,
        text: text,
        date: new Date(),
        deleted: false,
      });
      alert("등록되었습니다!");
    }
  }

  return (
    <>
      <Card variant="outlined">
        <Cardflex>
          <TextField
            required
            id="outlined-basic"
            label="이름"
            variant="outlined"
            style={{ flexGrow: 1 }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="연락처"
            variant="outlined"
            style={{ flexGrow: 1 }}
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </Cardflex>
        <Cardflex>
          <TextField
            required
            multiline
            id="outlined-basic"
            label="내용"
            variant="outlined"
            minRows={4}
            style={{ flexGrow: 1 }}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </Cardflex>
        <Cardflex>
          <Button variant="outlined" onClick={handleSubmit}>
            제출
          </Button>
        </Cardflex>
      </Card>
    </>
  );
};

export default InputCard;
