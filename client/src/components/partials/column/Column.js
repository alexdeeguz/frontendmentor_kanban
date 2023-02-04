import { useEffect, useState } from "react";
import { fetchTasks } from "../../../actions/tasks";
import "../partials.css";

const Column = ({ column, openModal, selectTask }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks(column._id).then((res) => setTasks(res.data));
  }, []);

  return (
    <section className="column">
      <div className="column__header">
        <div className="dot"></div>
        <h1 className="text--medium">{column.name.toUpperCase()} ({tasks.length})</h1>
      </div>

      {tasks?.map((task) => (
        <div key={task._id} className="column__card bg--dark-grey" onClick={() => selectTask(task)}>
          <h2>{task.title}</h2>
          <h3 className="text--medium">
            {task.subtasks.filter((subtask) => subtask.isCompleted).length} of{" "}
            {task.subtasks.length + " "}
            subtasks
          </h3>
        </div>
      ))}
    </section>
  );
};

export default Column;
