import { useContext } from "react";

import { BoardContext } from "../context/BoardContext";
import Overlay from "./Overlay";
import Column from "./partials/column/Column";

const Home = () => {
  const {
    data: { columns },
  } = useContext(BoardContext);

  return (
    <div className="home">
      <Overlay />
      {columns?.map((column) => (
        <Column key={column._id} column={column} />
      ))}
      {/* <Overlay /> */}
    </div>
  );
};

export default Home;
