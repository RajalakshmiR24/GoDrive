import React from "react";
import Lottie from "lottie-react";
import styled from "styled-components";
import loaderAnimation from "../assets/Animations/Loading.json";

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
`;

const Loader = () => {
  return (
    <LoaderWrapper>
      <Lottie
        animationData={loaderAnimation}
        loop={true}
        autoplay={true}
      />
    </LoaderWrapper>
  );
};

export default Loader;