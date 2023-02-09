import { useEffect, useState } from "react";
import { updateTask } from "../../actions/tasks";

const EditFormModal = ({ columns, closeModal, task, darkMode }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [currentSubtasks, setCurrentSubtasks] = useState([])
  const [subtasks, setSubtasks] = useState([
    // { idx: 0, title: "", isCompleted: false },
  ]);
  const [selectedStatus, setSelectedStatus] = useState(columns[0]._id);

  useEffect(() => {
    if (!task) return

    setTitle(task?.title)
    setDescription(task?.description)
    setCurrentSubtasks(task?.subtasks)
    setSelectedStatus(task?.status)
  }, [task])
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { title, description, status: selectedStatus, subtasks: [...subtasks, ...currentSubtasks] }
    updateTask(task._id, data).then(
      () => {
        closeModal();
        setTitle("");
        setDescription("");
        setSubtasks([]);
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

  const updateCurrentSubtasks = (e, subtask) => {
    let subtasks = []
    currentSubtasks.forEach(el => {
      if (el._id === subtask._id) {
        subtasks.push({ ...el, title: e.target.value })
      } else {
        subtasks.push(el)
      }
    })

    setCurrentSubtasks(subtasks)
  }

  const deleteCurrentSubtask = (e, id) => {
    setCurrentSubtasks(currentSubtasks.filter((el) => el._id !== id));
  }

  const addSubtask = (e, idx) => {
    e.preventDefault();

    setSubtasks([...subtasks, { idx: subtasks.length, title: "" }]);
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
    <div
      id="form__modal--edit"
      className={`form__modal ${darkMode ? "text--white" : "text--dark"}`}
    >
      <form
        className={`form__modal-content ${
          darkMode ? "bg--dark-grey" : "bg--white"
        }`}
      >
        <h1>Edit Task</h1>
        <label>
          Title
          <input
            className={`${darkMode ? "text--white" : ""}`}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label>
          Description
          <textarea
            className={`${darkMode ? "text--white" : ""}`}
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <label>
          Subtasks
          {currentSubtasks?.map((el) => (
            <div className="subtask" key={el._id}>
              <input
                className={`${darkMode ? "text--white" : ""}`}
                type="text"
                value={el.title}
                onChange={(e) => updateCurrentSubtasks(e, el)}
              />
              <img
                src="/assets/icon-cross.svg"
                onClick={(e) => deleteCurrentSubtask(e, el._id)}
              />
            </div>
          ))}
          {subtasks
            .sort((a, b) => a.idx - b.idx)
            .map((el, idx) => (
              <div className="subtask" key={el.idx}>
                <input
                  className={`${darkMode ? "text--white" : ""}`}
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
          <select
            onChange={(e) => setSelectedStatus(e.target.value)}
            className={`${darkMode ? "text--white" : ""}`}
          >
            {columns?.map((column) => (
              <option
                value={column._id}
                key={column._id}
                selected={selectedStatus === column._id}
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
              Save Changes
            </button>
          </div>
        </label>
      </form>
    </div>
  );
};

export default EditFormModal;
