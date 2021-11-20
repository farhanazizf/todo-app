import React from "react";
import styled from "styled-components/macro";

const Styled = {
  MainWrapper: styled.div`
    padding: 25px 50px;
  `,
  Wrapper: styled.div`
    margin-top: 30px;
    border: 1px solid black;
    border-radius: 10px;
  `,
  ChildWrapper: styled.section`
    padding: 10px 20px;
    // width: 100%;
    p.headText {
      font-size: 24px;
      font-weight: 700;
    }
  `,
  Flex: styled.div`
    // justify-content: space-between;
    display: flex;
    border: 1px solid lightgrey;
    padding: 10px 5px;
    margin: 5px 0;
    border-radius: 10px;
    cursor: pointer;
    p {
      margin: 5px 0;
    }

    div.titleWrap {
      width: 60%;
      display: flex;
      align-items: center;
    }
    div.timeWrap {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 25%;
    }
    div.statusWrap {
      justify-content: center;
      align-items: center;
      width: 15%;

      p {
        width: fit-content;
        padding: 5px 10px;
        border-radius: 8px;
      }
      p.taskDone {
        color: rgb(0, 102, 68);
        background: rgb(227, 252, 239);
      }
      p.taskWait {
        color: rgb(66, 82, 110);
        background: rgb(223, 225, 230);
      }
    }
  `,
  ButtonWrapper: styled.div`
    display: flex;
    justify-content: center;
    margin-top: 50px;
  `,
  DeleteWrapper: styled.div`
    display: flex;
    justify-content: center;
    margin-top: 10px;
  `,
  ModalWrapper: styled.div`
    padding: 10px 50px;
  `,
};

export const TaskItem: React.FC<{
  title: string;
  time: string;
  done: boolean;
  onClick?: () => void;
}> = ({ title = "", time = "", done = false, onClick }) => {
  return (
    <Styled.Flex onClick={onClick}>
      <div className="titleWrap">
        <p className="taskName">{title}</p>
      </div>
      <div className="timeWrap">
        <p className="taskTime">{time}</p>
      </div>
      <div className="statusWrap">
        <p className={done ? "taskDone" : "taskWait"}>
          {done ? "DONE" : "TO DO"}
        </p>
      </div>
    </Styled.Flex>
  );
};

export default Styled;
