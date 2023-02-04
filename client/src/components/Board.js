import { useContext } from "react";

import { BoardContext } from "../context/BoardContext";
import Overlay from "./Overlay";
import Column from "./partials/column/Column";

const Home = () => {
  const {
    data: { columns },
    openModal,
    closeModal,
    selectTask
  } = useContext(BoardContext);

  return (
    <div className="home">
      <div>
        <Overlay closeModal={closeModal}/>
        {columns?.map((column) => (
          <Column key={column._id} column={column} openModal={openModal} selectTask={selectTask}/>
        ))}
        {/* <Overlay /> */}
      </div>
    </div>
  );
};

export default Home;
