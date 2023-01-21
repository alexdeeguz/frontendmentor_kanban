import { useState, useEffect, createContext } from "react";
import { fetchBoards } from "../actions/boards";
import { fetchColumns } from "../actions/columns";

export const BoardContext = createContext();

const BoardContextProvider = ({ children }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const boardsResponse = await fetchBoards();
    const currentBoard = boardsResponse.data[0];
    const columnsResponse = await fetchColumns(currentBoard._id);

    const board = localStorage.getItem("board");
    if (board === null) {
      localStorage.setItem("board", currentBoard._id);
      setData({
        ...data,
        selectedBoard: currentBoard,
        boards: boardsResponse.data,
        columns: columnsResponse.data,
      });
    } else {
      setData({
        ...data,
        selectedBoard: board,
        boards: boardsResponse.data,
        columns: columnsResponse.data,
      });
    }
    setLoading(false)
  };

  const selectBoard = (id) => {
    localStorage.setItem("board", id);
    fetchColumns(id).then((res) => {
      setData({ ...data, columns: res.data });
    });
  };

  return (
    <BoardContext.Provider value={{ selectBoard, data, loading }}>
      {children}
    </BoardContext.Provider>
  );
};

export default BoardContextProvider;
