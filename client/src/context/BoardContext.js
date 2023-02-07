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

  const fetchBoardsAndColumns = async () => {
    const boardsRes = await fetchBoards();
    const columnsRes = await fetchColumns(boardsRes.data[0]._id);
    const overlay = document.getElementById("overlay");
    data.modal.style.transform = "scale(0)";
    overlay.style.display = "none";

    setLoading(true);
    setData({
      ...data,
      boards: boardsRes.data,
      columns: columnsRes.data,
      modalOpen: false,
      boardName: boardsRes?.data.find((el) => el._id === data.selectedBoard)
        ? boardsRes?.data.find((el) => el._id === data.selectedBoard).name
        : "",
      selectedBoard: boardsRes.data[0]._id,
    });
    setLoading(false);
  };

  const fetchData = async () => {
    setLoading(true);
    const boardsResponse = await fetchBoards();
    const currentBoard = boardsResponse.data[0];
    const board = localStorage.getItem("board");
    const columnsResponse =
      board === null
        ? await fetchColumns(currentBoard._id)
        : await fetchColumns(board);

    if (board === null) {
      localStorage.setItem("board", currentBoard._id);
      console.log({
        ...data,
        selectedBoard: currentBoard,
        boards: boardsResponse.data,
        columns: columnsResponse.data,
        boardName: "",
      });
      setData({
        ...data,
        selectedBoard: currentBoard,
        boards: boardsResponse.data,
        columns: columnsResponse.data,
        boardName: "",
      });
    } else {
      // const boardName = boardsResponse?.data.find(el => el._id === board)
      // console.log(boardName)
      setData({
        ...data,
        selectedBoard: board,
        boards: boardsResponse.data,
        columns: columnsResponse.data,
        boardName: boardsResponse?.data.find((el) => el._id === board).name,
      });
    }
    closeModal();
    // closeDrawer()
    setLoading(false);
  };

  const selectBoard = (id) => {
    localStorage.setItem("board", id);
    fetchColumns(id).then((res) => {
      closeModal();
      setData({
        ...data,
        columns: res.data,
        selectedBoard: id,
        modalOpen: false,
      });
    });
  };

  const selectTask = (task) => {
    setData({
      ...data,
      task: task,
    });
    openModal("form__modal--view", task);
  };

  const closeDrawer = () => {
    let boardsModal = document.getElementById("boards__modal");
    let arrow = document.getElementById("icon-arrow");
    let overlay = document.getElementById("overlay");

    if (boardsModal) boardsModal.style.transform = "translateX(-150%)";
    if (arrow) arrow.style.transform = "rotate(0deg)";
    if (overlay) overlay.style.display = "none";
    setData({
      ...data,
      modalOpen: false,
    });
  };

  const openModal = (id, otherData = null) => {
    let modal = document.getElementById(id);
    let arrow = document.getElementById("icon-arrow");
    const overlay = document.getElementById("overlay");

    if (data.modalOpen && id !== "board__modal--add") {
      closeDrawer();
      return;
    }

    if (modal.id === "boards__modal") {
      arrow.style.transform = "rotate(180deg)";
      modal.style.transform = "translate(0,0)";
    } else if (
      modal.id === "form__modal--add" ||
      modal.id === "form__modal--edit" ||
      modal.id === "board__modal--add" ||
      modal.id === "board__modal--edit" ||
      modal.id === "form__modal--view" ||
      modal.id === "delete__modal"
    ) {
      modal.style.transform = "scale(100%)";
      modal.style.transform += "translateX(-50%)";
    }

    overlay.style.display = "block";
    setData({
      ...data,
      modal,
      modalOpen: true,
      otherData,
    });
  };

  const closeModal = () => {
    if (data.modal === undefined) return;
    const overlay = document.getElementById("overlay");

    if (data.modal.id === "boards__modal") {
      document.getElementById("icon-arrow").style.transform = "rotate(0deg)";
      data.modal.style.transform = "translateX(-150%)";
    } else if (
      data.modal.id === "form__modal--add" ||
      data.modal.id === "form__modal--edit" ||
      data.modal.id === "board__modal--add" ||
      data.modal.id === "board__modal--edit" ||
      data.modal.id === "form__modal--view" ||
      data.modal.id === "delete__modal"
    ) {
      data.modal.style.transform = "scale(0)";
      closeDrawer();
    }
    overlay.style.display = "none";
    setData({
      ...data,
      modal: null,
      modalOpen: false,
    });
  };

  return (
    <BoardContext.Provider
      value={{
        closeModal,
        openModal,
        selectBoard,
        data,
        loading,
        selectTask,
        setData,
        fetchData,
        fetchBoardsAndColumns,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export default BoardContextProvider;
