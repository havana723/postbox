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

  const openDate = new Date("2021-07-23");

  return (
    <>
      {new Date() >= openDate ? (
        <div style={{ margin: "4px" }}>
          <Card variant="outlined" style={{ margin: "4px" }}>
            <Cardflex>{name}</Cardflex>
            <Cardflex>
              <CardCard variant="outlined">
                <div style={{ wordBreak: "break-all" }}>{text}</div>
              </CardCard>
            </Cardflex>
          </Card>
        </div>
      ) : (
        <div style={{ margin: "4px" }}>
          <Card variant="outlined">
            <Cardflex>
              <CardCard variant="outlined">
                <div style={{ wordBreak: "break-all" }}>
                  아직 볼 수 없는 메세지예요!
                </div>
              </CardCard>
            </Cardflex>
          </Card>
        </div>
      )}
    </>
  );
};

export default MessageCard;
