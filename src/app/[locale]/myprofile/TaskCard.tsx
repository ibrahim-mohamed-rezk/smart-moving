import { TaskTypes } from "@/libs/types/types";

const TaskCard: React.FC<TaskTypes> = ({ task }) => {
  return (
    <div className="w-full p-4 md:p-6 bg-white rounded-2xl inline-flex flex-col justify-center items-start gap-4 md:gap-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="self-stretch inline-flex justify-between items-center">
        <div className="justify-start text-blue-950 text-xl md:text-3xl font-bold font-['Libre_Baskerville']">
          {task.title}
        </div>
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M33.3336 20H6.66699"
            stroke="#192953"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M25.0007 28.3337C25.0007 28.3337 33.3338 22.1963 33.3338 20.0003C33.3338 17.8043 25.0005 11.667 25.0005 11.667"
            stroke="#192953"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div className="self-stretch flex flex-col justify-center items-start gap-3 md:gap-4">
        <div className="self-stretch justify-start text-black/60 text-base md:text-xl font-bold font-['Libre_Baskerville']">
          {task.description}
        </div>
        <div className="self-stretch inline-flex justify-between items-center flex-wrap gap-2">
          <div className="p-2 md:p-2.5 bg-sky-500 rounded-[30px] flex justify-center items-center gap-2">
            <div className="justify-start text-white text-sm md:text-lg font-normal font-['Libre_Baskerville']">
              {task.status}
            </div>
          </div>
          <div className="flex justify-start items-center gap-1">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.6668 3.33301L3.3335 12.6664M3.3335 3.33301L12.6668 12.6664"
                stroke="#DC3545"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <div className="justify-start text-red-500 text-xs md:text-sm font-normal font-['Libre_Baskerville']">
              Close task
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
