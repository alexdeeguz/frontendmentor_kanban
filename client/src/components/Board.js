import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchBoard } from "../actions/boards";
import { fetchColumns } from "../actions/columns";
import Column from "./partials/column/Column";
import Empty from "./partials/Empty";

const Home = () => {
  const { id } = useParams();
  const [columns, setColomns] = useState([]);

  useEffect(() => {
    fetchColumns(id).then((res) => setColomns(res.data));
  }, []);

  return (
    <div className="home">
      {columns.map(column => (
        <Column column={column}/>
      ))}
    </div>
  );
};

export default Home;
