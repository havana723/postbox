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

  const openDate = new Date("2022-05-11");

  return (
    <>
      {new Date() >= openDate ? (
        <Card variant="outlined">
          <Cardflex>{name}</Cardflex>
          <Cardflex>
            <CardCard variant="outlined">
              <div style={{ wordBreak: "break-all" }}>{text}</div>
            </CardCard>
          </Cardflex>
        </Card>
      ) : (
        <Card variant="outlined">
          <Cardflex>{name}</Cardflex>
          <Cardflex>
            <CardCard variant="outlined">
              <div style={{ wordBreak: "break-all" }}>
                {openDate.getMonth() + 1}월 {openDate.getDate()}일에 공개되는
                메세지예요!
              </div>
            </CardCard>
          </Cardflex>
        </Card>
      )}
    </>
  );
};

export default MessageCard;
