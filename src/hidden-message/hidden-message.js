import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";

const Fade = props => (
  <CSSTransition unmountOnExit timeout={1000} classNames='fade' {...props} />
);

const HiddenMessage = ({ children }) => {
  const [show, setShow] = useState();
  const toggle = () => setShow(s => !s);

  return (
    <>
      <button onClick={toggle}>Toggle</button>
      <Fade in={show}>
        <div>{children}</div>
      </Fade>
    </>
  );
};

export default HiddenMessage;
