import { Card } from "@mui/material";
import styled from "styled-components";

export interface Message {
  name: string;
  contact: string;
  text: string;
  deleted: boolean;
  date: Date;
}

interface Props {
  message: Message;
}

const Cardflex = styled.div`
  display: flex;
  align-content: center;
  justify-content: space-evenly;
  gap: 10px;
  margin: 10px 10px;
`;

const CardCard = styled(Card)`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 8px;
`;

const MessageCard: React.FC<Props> = (props) => {
  const { name, contact, text, deleted, date } = props.message;

  return (
    <>
      <Card variant="outlined">
        <Cardflex>
          <CardCard variant="outlined">
            <div>{name}</div>
          </CardCard>
          <CardCard variant="outlined">
            <div>{contact}</div>
          </CardCard>
        </Cardflex>
        <Cardflex>
          <CardCard variant="outlined">
            <div style={{ wordBreak: "break-all" }}>{text}</div>
          </CardCard>
        </Cardflex>
      </Card>
    </>
  );
};

export default MessageCard;