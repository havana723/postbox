import { Button, Card, TextField } from "@mui/material";
import styled from "styled-components";

const Cardflex = styled.div`
  display: flex;
  align-content: center;
  justify-content: space-evenly;
  gap: 10px;
  margin: 10px 10px;
`;

const InputCard: React.FC = (props) => {
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
          />
          <TextField
            id="outlined-basic"
            label="연락처"
            variant="outlined"
            style={{ flexGrow: 1 }}
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
          />
        </Cardflex>
        <Cardflex>
          <Button variant="outlined">제출</Button>
        </Cardflex>
      </Card>
    </>
  );
};

export default InputCard;
