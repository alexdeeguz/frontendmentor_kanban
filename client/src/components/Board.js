import { useContext } from "react";

import { BoardContext } from "../context/BoardContext";
import Column from "./partials/column/Column";

const Home = () => {
  const {
    data: { columns },
  } = useContext(BoardContext);

  return (
    <div className="home">
      {columns?.map((column) => (
        <Column key={column._id} column={column} />
      ))}
    </div>
  );
};

export default Home;
