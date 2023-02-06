import { useEffect, useState } from "react";

const EditBoardModal = ({ boardName, modalOpen, columns }) => {
  const [name, setName] = useState(boardName)
  const [columnNames, setColumnNames] = useState(columns)
  useEffect(() => {
    setName(boardName)
    setColumnNames(columns)
  }, [boardName, modalOpen])

  const handleUpdate = (e, id) => {
    let newColumns = []
    columnNames.forEach(el => {
      if (el._id === id) {
        newColumns.push({ ...el, name: e.target.value })
      } else {
        newColumns.push(el)
      }
    })

    setColumnNames(newColumns)
  }
  return (
    <div id="board__modal--edit" className="form__modal">
      <form className="form__modal-content bg--dark-grey">
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
              <input type="text" value={el.name} onChange={(e) => handleUpdate(e, el._id)}/>
              <img src="/assets/icon-cross.svg" />
            </div>
          ))}
          <div id="add-task__button" className="btn-container">
            <button className="btn bg--white text--main">
              + Add New Column
            </button>
          </div>
        </label>

        <div id="add-task__button--bottom" className="btn-container">
          <button className="btn bg--purple text--white">Save Changes</button>
        </div>
      </form>
    </div>
  );
};

export default EditBoardModal;
