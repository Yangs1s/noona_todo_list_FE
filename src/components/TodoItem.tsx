const TodoItem = ({
  task,
  isCompleted,
  authorName,
  handleToggle,
  handleDelete,
}: {
  task: string;
  isCompleted: boolean;
  authorName: string;
  handleToggle: () => void;
  handleDelete: () => void;
}) => {
  return (
    <div
      className={`group rounded-2xl px-5 py-4 transition-all duration-300 ${
        isCompleted
          ? "bg-emerald-50 border border-emerald-200"
          : "bg-white border border-gray-100 hover:border-violet-200 hover:shadow-md"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        {/* Task Content */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <button
            onClick={handleToggle}
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 cursor-pointer shrink-0 ${
              isCompleted
                ? "bg-emerald-500 border-emerald-500"
                : "border-gray-300 hover:border-violet-400"
            }`}
          >
            {isCompleted && (
              <svg
                className="w-3.5 h-3.5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </button>
          <div className="flex flex-col min-w-0">
            <span
              className={`text-sm transition-all duration-300 truncate ${
                isCompleted ? "line-through text-gray-400" : "text-gray-700"
              }`}
            >
              {task}
            </span>
            <span className="text-xs text-gray-400">{authorName}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Status Badge */}
          <span
            className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-300 ${
              isCompleted
                ? "bg-emerald-100 text-emerald-600"
                : "bg-violet-100 text-violet-600"
            }`}
          >
            {isCompleted ? "완료" : "진행중"}
          </span>

          {/* 삭제 버튼 */}
          <button
            className="p-2 rounded-xl text-gray-300 hover:text-rose-500 hover:bg-rose-50 active:bg-rose-100 transition-all duration-200 cursor-pointer 
              md:opacity-0 md:group-hover:opacity-100"
            title="삭제"
            onClick={handleDelete}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
