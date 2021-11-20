import React from "react";
import { Modal } from "@mui/material";
import styled from "styled-components/macro";
import CloseIcon from "@mui/icons-material/Close";

interface ContainerProps {
  align?: string;
}

export interface ModalProps extends ContainerProps {
  visible: boolean;
  onDismiss: () => void;
  hideCloseIcon?: boolean;
  showBackdrop?: boolean;
}

// export const Wrapper = styled.div`
//   position: relative;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100%;
//   padding: 0 2rem;
// `;

export const Container = styled.section<ContainerProps>`
  position: relative;
  border-radius: 1rem;
  padding: 2.15rem 1.5rem 2rem;
  min-width: 90vw;
  text-align: ${(props) => props.align};
  background: #fff;
`;

const CloseNow = styled(CloseIcon)`
  &&& {
    cursor: pointer;
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
  }
`;

const Modals: React.FC<ModalProps> = ({
  visible = false,
  onDismiss,
  align,
  hideCloseIcon,
  children,
}) => {
  return (
    <Modal
      open={visible}
      onClose={onDismiss}
      onBackdropClick={onDismiss}
      style={{
        top: "20%",
        marginInline: "2.5rem",
      }}
    >
      {/* <Wrapper> */}
      <Container align={align}>
        {hideCloseIcon ? null : <CloseNow onClick={onDismiss} />}

        {children}
      </Container>
      {/* </Wrapper> */}
    </Modal>
  );
};

export default Modals;
