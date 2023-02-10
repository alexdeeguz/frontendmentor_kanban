import { useState } from "react";
import { createBoard } from "../../actions/boards";
import { createColumn } from "../../actions/columns";

const AddBoardModal = ({ selectBoard, darkMode }) => {
  const [name, setName] = useState("");
  const [columns, setColumns] = useState([]);

  const addColumn = (e, idx) => {
    e.preventDefault();

    setColumns([...columns, { idx: columns?.length, name: "" }]);
  };

  const deleteColumn = (e, idx) => {
    e.preventDefault();
    let newCols = [];
    columns?.forEach((col) => {
      if (idx !== col.idx) newCols.push(col);
    });

    setColumns(newCols);
  };

  const updateColumn = (e, idx) => {
    e.preventDefault();

    let newCols = [];
    columns.forEach((col) => {
      if (idx === col.idx) {
        newCols.push({ ...col, name: e.target.value });
      } else {
        newCols.push(col);
      }
    });

    setColumns(newCols);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let promises = [];
    createBoard({ name }).then((res) => {
      columns.forEach((el) => {
        promises.push(createColumn({ board: res.data._id, name: el.name }));
      });
      Promise.all(promises).then(() => {
        selectBoard(res.data._id);
        setName("");
        setColumns([{ idx: 0, name: "" }]);
      });
    });
  };

  return (
    <div
      id="board__modal--add"
      className={`form__modal ${darkMode ? "text--white" : "text--dark"}`}
    >
      <form
        className={`form__modal-content ${
          darkMode ? "bg--dark-grey" : "bg--white"
        }`}
      >
        <h1>Add New Board</h1>
        <label>
          Board Name
          <input
            className={`${darkMode ? "text--white" : ""}`}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label>
          Board Columns
          {columns
            ?.sort((a, b) => a.idx - b.idx)
            .map((el) => (
              <div className="subtask" key={el.idx}>
                <input
                  className={`${darkMode ? "text--white" : ""}`}
                  type="text"
                  value={el.name}
                  onChange={(e) => updateColumn(e, el.idx)}
                />
                <img
                  src="/assets/icon-cross.svg"
                  onClick={(e) => deleteColumn(e, el.idx)}
                />
              </div>
            ))}
          <div id="add-task__button" className="btn-container">
            <button
              className="btn bg--white text--main"
              onClick={(e) => addColumn(e, columns.length)}
            >
              + Add New Column
            </button>
          </div>
        </label>

        <div id="add-task__button--bottom" className="btn-container">
          <button className="btn bg--purple text--white" onClick={handleSubmit}>
            Create New Board
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBoardModal;
