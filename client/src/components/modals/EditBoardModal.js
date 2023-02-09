import { useEffect, useState } from "react";
import { editBoard } from "../../actions/boards";
import { createColumn, deleteColumn } from "../../actions/columns";

const EditBoardModal = ({
  boardName,
  modalOpen,
  columns,
  selectedBoard,
  fetchBoardsAndColumns,
  selectBoard,
  darkMode
}) => {
  const [name, setName] = useState(boardName);
  const [columnNames, setColumnNames] = useState(columns);
  const [newColumns, setNewColumns] = useState([]);
  const [columnsToDelete, setColumnsToDelete] = useState([]);

  useEffect(() => {
    setName(boardName);
    setColumnNames(columns);
  }, [boardName, modalOpen, columns]);

  const handleUpdate = (e, id) => {
    let newColumns = [];
    columnNames.forEach((el) => {
      if (el._id === id) {
        newColumns.push({ ...el, name: e.target.value });
      } else {
        newColumns.push(el);
      }
    });

    setColumnNames(newColumns);
  };

  const handleClickSave = (e) => {
    e.preventDefault();

    editBoard(selectedBoard, columnNames, name).then((res) => {
      selectBoard(selectedBoard);
    });

    let promises = [];
    if (newColumns.length) {
      newColumns.forEach((col) => {
        promises.push(createColumn({ name: col.name, board: selectedBoard }));
      });
    }

    if (columnsToDelete.length) {
      columnsToDelete.forEach(col => {
        promises.push(deleteColumn(col._id))
      })
    }

    Promise.all(promises);
  };

  const addColumn = (e) => {
    e.preventDefault();
    setNewColumns([...newColumns, { idx: newColumns.length }]);
  };

  const removeColumn = (e, idx) => {
    e.preventDefault();
    let newCols = [];
    newColumns.forEach((col) => {
      if (idx !== col.idx) newCols.push(col);
    });

    setNewColumns(newCols);
  };

  const handleDeleteColumn = (column) => {
    let newCols = [];
    columnNames.forEach((el) => {
      if (el._id !== column._id) {
        newCols.push(el);
      }
    });
    setColumnNames(newCols)
    setColumnsToDelete([...columnsToDelete, column]);
  };

  const updateColumn = (e, idx) => {
    e.preventDefault();

    let newCols = [];
    newColumns.forEach((col) => {
      if (idx === col.idx) {
        newCols.push({ ...col, name: e.target.value });
      } else {
        newCols.push(col);
      }
    });

    setNewColumns(newCols);
  };

  return (
    <div
      id="board__modal--edit"
      className={`form__modal ${darkMode ? "text--white" : "text--dark"}`}
    >
      <form className={`form__modal-content ${darkMode ? "bg--dark-grey" : "bg--white"}`}>
        <h1>Edit Board</h1>
        <label>
          Board Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label>
          Board Columns
          {columnNames?.map((el) => (
            <div className="subtask" key={el._id}>
              <input
                type="text"
                value={el.name}
                onChange={(e) => handleUpdate(e, el._id)}
              />
              <img
                src="/assets/icon-cross.svg"
                onClick={(e) => handleDeleteColumn(el)}
              />
            </div>
          ))}
          {newColumns.map((el) => (
            <div className="subtask" key={el.idx}>
              <input
                type="text"
                value={el.name}
                onChange={(e) => updateColumn(e, el.idx)}
              />
              <img
                src="/assets/icon-cross.svg"
                onClick={(e) => removeColumn(e, el.idx)}
              />
            </div>
          ))}
          <div id="add-task__button" className="btn-container">
            <button className="btn bg--white text--main" onClick={addColumn}>
              + Add New Column
            </button>
          </div>
        </label>

        <div id="add-task__button--bottom" className="btn-container">
          <button
            className="btn bg--purple text--white"
            onClick={handleClickSave}
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBoardModal;
