import { useState } from "react";
import { createTask } from "../../actions/tasks";

const AddFormModal = ({ columns, closeModal }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subtasks, setSubtasks] = useState([
    { idx: 0, title: "", isCompleted: false },
  ]);
  const [selectedStatus, setSelectedStatus] = useState(columns[0]._id);

  const handleSubmit = (e) => {
    e.preventDefault();
    createTask({ title, description, status: selectedStatus, subtasks }).then(
      () => {
        closeModal();
        setTitle("")
        setDescription("")
        setSubtasks([{ idx: 0, title: "", isCompleted: false }]);
        setSelectedStatus(columns[0]._id);
      }
    );
  };

  const updateSubtask = (e, idx) => {
    let newCols = [];
    subtasks.forEach((task) => {
      if (idx === task.idx) {
        newCols.push({ ...task, title: e.target.value });
      } else {
        newCols.push(task);
      }
    });

    setSubtasks(newCols);
  };

  const addSubtask = (e, idx) => {
    e.preventDefault();

    setSubtasks([...subtasks, { idx, title: "" }]);
  };

  const deleteSubtask = (e, idx) => {
    e.preventDefault();
    let newCols = [];
    subtasks.forEach((col) => {
      if (idx !== col.idx) newCols.push(col);
    });
    setSubtasks(newCols);
  };

  return (
    <div id="form__modal--add" className="form__modal">
      <form className="form__modal-content bg--dark-grey">
        <h1>Add New Task</h1>
        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label>
          Description
          <textarea
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <label>
          Subtasks
          {subtasks
            .sort((a, b) => a.idx - b.idx)
            .map((el, idx) => (
              <div className="subtask" key={el.idx}>
                <input
                  type="text"
                  value={el.title}
                  onChange={(e) => updateSubtask(e, idx)}
                />
                <img
                  src="/assets/icon-cross.svg"
                  onClick={(e) => deleteSubtask(e, el.idx)}
                />
              </div>
            ))}
          <div id="add-task__button" className="btn-container">
            <button
              className="btn bg--white text--main"
              onClick={(e) => addSubtask(e, subtasks.length)}
            >
              + Add New Subtask
            </button>
          </div>
        </label>

        <label>
          Status
          <select onChange={(e) => setSelectedStatus(e.target.value)}>
            {columns?.map((column) => (
              <option
                selected={selectedStatus === column._id}
                value={column._id}
                key={column._id}
              >
                {column.name}
              </option>
            ))}
          </select>
          <div id="add-task__button--bottom" className="btn-container">
            <button
              className="btn bg--purple text--white"
              onClick={handleSubmit}
            >
              Create Task
            </button>
          </div>
        </label>
      </form>
    </div>
  );
};

export default AddFormModal;
