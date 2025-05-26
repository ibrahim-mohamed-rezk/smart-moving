"use client";

import { TaskTypes } from "@/libs/types/types";
import TaskCard from "./TaskCard";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface TasksCardsProps {
  tasksData: TaskTypes[];
}

const TasksCards = ({ tasksData }: TasksCardsProps) => {
  const t = useTranslations("tasks");
  const [filter, setFilter] = useState<string>("all");

  const filteredTasks = tasksData.filter((task) => {
    if (filter === "all") return true;
    return task.status === filter;
  });

  return (
    <div className="w-full">
      <div className="w-full md:w-96  h-auto md:h-11 justify-start text-blue-950 text-2xl md:text-4xl font-bold font-['Libre_Baskerville']">
        {t("your_tasks")} ({filteredTasks.length})
      </div>

      <div className="flex gap-2 py-5 mx-auto w-fit mb-4">
        {["all", "pending", "processing", "done"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-md ${
              filter === status
                ? "bg-blue-950 text-white"
                : "bg-white text-blue-950 border border-blue-950"
            }`}
          >
            {t(status)}
          </button>
        ))}
      </div>

      <div className="w-full flex flex-col justify-start items-start gap-4 md:gap-6">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TasksCards;
