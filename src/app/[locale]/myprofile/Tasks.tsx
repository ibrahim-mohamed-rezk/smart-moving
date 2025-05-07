import React from "react";
import TaskCard from "./TaskCard";

const Tasks = () => {
  // You could expand this to use real data from props or state
  const tasks = Array(6).fill({
    title: "Private Moving",
    description: "Private relocation thisted to thisted",
    status: "open to bids",
  });

  return (
    <div className="w-full inline-flex flex-col justify-center items-start gap-4 md:gap-8 px-4 md:px-6">
      <div className="w-full md:w-96 h-auto md:h-11 justify-start text-blue-950 text-2xl md:text-4xl font-bold font-['Libre_Baskerville']">
        Your Tasks
      </div>
      <div className="w-full flex flex-col justify-start items-start gap-4 md:gap-6">
        {/* Display all tasks in a grid that adapts to screen size */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
          {tasks.map((task, index) => (
            <TaskCard key={index} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
};





export default Tasks;
