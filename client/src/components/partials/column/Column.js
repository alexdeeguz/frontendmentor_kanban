import { useEffect, useState } from "react";
import { fetchTasks } from "../../../actions/tasks";
import "../partials.css";

const Column = ({ column }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks(column._id).then((res) => setTasks(res.data));
  }, []);

  return (
    <section className="column">
      <div className="column__header">
        <div className="dot"></div>
        <h1 className="text--medium">TODO (4)</h1>
      </div>

      {tasks.map((task) => (
        <div className="column__card bg--dark-grey">
          <h2>{task.title}</h2>
          <h3 className="text--medium">0 of 3 subtasks</h3>
        </div>
      ))}
    </section>
  );
};

export default Column;
