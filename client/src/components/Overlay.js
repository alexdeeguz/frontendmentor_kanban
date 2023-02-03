// import { useContext } from "react";
// import { BoardContext } from "../context/BoardContext";

const Overlay = ({ closeModal }) => {
  // const { closeModal } = useContext(BoardContext);
  return <div id="overlay" onClick={closeModal}></div>;
};

export default Overlay;
