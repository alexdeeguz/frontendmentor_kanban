import { useState, useEffect, createContext } from "react";
import { fetchBoards } from "../actions/boards";
import { fetchColumns } from "../actions/columns";

export const BoardContext = createContext();

const BoardContextProvider = ({ children }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

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
    setLoading(false);
  };

  const selectBoard = (id) => {
    localStorage.setItem("board", id);
    fetchColumns(id).then((res) => {
      setData({ ...data, columns: res.data });
    });
  };

  const openModal = (id) => {
    let modal = document.getElementById(id);
    let arrow = document.getElementById("icon-arrow");
    const overlay = document.getElementById("overlay");

    if (modal === data.modal) {
      closeModal();
      return;
    } else if (data.modal && modal !== data.modal) {
      closeModal()
    }

    if (modal.id === "boards__modal") {
      arrow.style.transform = "rotate(180deg)";
      modal.style.transform = "translate(0,0)";
    } else if (modal.id === "form__modal") {
      modal.style.transform = "scale(100%)";
    }

    overlay.style.display = "block";
    setData({
      ...data,
      modal,
    });
  };

  const closeModal = () => {
    const overlay = document.getElementById("overlay");

    if (data.modal.id === "boards__modal") {
      document.getElementById("icon-arrow").style.transform = "rotate(0deg)";
      data.modal.style.transform = "translateX(-150%)";
    } else if (data.modal.id === "form__modal") {
      data.modal.style.transform = "scale(0)";
    }
    overlay.style.display = "none";
    setData({
      ...data,
      modal: null,
    });
  };

  return (
    <BoardContext.Provider
      value={{ closeModal, openModal, selectBoard, data, loading }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export default BoardContextProvider;
