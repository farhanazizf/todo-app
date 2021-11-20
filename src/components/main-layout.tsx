import { Container } from "@mui/material";
import React from "react";
// import styled from "styled-components/macro";
// import TopMenu from "./top-menu";
// import NavbarMenu from "./navbar";

// const Styled = {
//   NavWrapper: styled.div`
//     display: flex;
//     background: #ffffff;
//     // width: 100%;
//     padding: 30px 100px;
//     p {
//       margin: 0;
//     }
//   `,
//   Container: styled(Container)`
//     &&& {
//       display: flex;
//     }
//   `,
//   FlexWrapper: styled.div<{ justify: string }>`
//     display: flex;
//     width: 33%;
//     justify-content: ${(props) => props.justify ?? "center"};
//     align-items: center;
//     font-size: 14px;
//     p {
//       margin: 0 10px;
//       cursor: pointer;
//       font-weight: 600;
//     }
//     svg {
//       margin: 0 15px;
//       cursor: pointer;
//     }
//   `,
// };

const MainLayout: React.FC = ({ children }) => {
  return (
    <div>
      {/* <TopMenu />
      <NavbarMenu /> */}
      <Container maxWidth="xl">{children}</Container>
    </div>
  );
};

export default MainLayout;
