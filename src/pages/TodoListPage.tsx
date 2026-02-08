import { useEffect } from "react";
import { useTask } from "../hooks/useTask";
import Button from "../components/shared/Button";
import Input from "../components/shared/Input";
import TodoItem from "../components/TodoItem";
import Layout from "../components/layout/Layout";
import LogoutButton from "../components/LogoutButton";

const ToDoListPage = () => {
  const {
    tasks,
    taskValue,
    setTaskValue,
    fetchTasks,
    handleCreateTask,
    handleDeleteTask,
    handleUpdateTask,
  } = useTask();

  useEffect(() => {
    const fetchAndSetTasks = async () => {
      await fetchTasks();
    };
    fetchAndSetTasks();
  }, []);

  console.log(tasks);
  return (
    <Layout>
      <div className="bg-purple-50 relative w-full max-w-lg lg:mx-auto min-h-[60dvh] rounded-3xl shadow-xl p-8 border border-gray-100">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-violet-600">
              My Todo List
            </h1>
            <p className="text-sm text-gray-400 mt-1">오늘도 화이팅!</p>
          </div>

          {/* Input Section */}
          <div className="flex w-full gap-3">
            <Input
              value={taskValue}
              setValue={setTaskValue}
              name="task"
              placeholder="할 일을 입력해주세요"
              onEnter={handleCreateTask}
            />
            <Button onClick={handleCreateTask}>
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </Button>
          </div>

          {/* Todo List */}
          <div className="flex flex-col gap-3">
            {tasks.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <p>할 일이 없습니다</p>
                <p className="text-sm mt-1">새로운 할 일을 추가해보세요!</p>
              </div>
            ) : (
              tasks?.map((t, index) => {
                // console.log(t);
                return (
                  <TodoItem
                    key={`${t.task}-${index}`}
                    authorName={t.author?.name}
                    task={t.task}
                    isCompleted={t.isCompleted}
                    handleToggle={() => handleUpdateTask(t._id)}
                    handleDelete={() => handleDeleteTask(t._id)}
                  />
                );
              })
            )}
          </div>
          <LogoutButton />
        </div>
      </div>
    </Layout>
  );
};

export default ToDoListPage;
