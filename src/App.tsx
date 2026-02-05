import { useEffect, useState } from "react";
import Button from "./components/shared/Button";
import Input from "./components/shared/Input";
import TodoItem from "./components/TodoItem";
import api from "./utils/api";
import { type Task } from "./types/todo";
import { ToastContainer, toast } from "react-toastify";
function App() {
  const [taskValue, setTaskValue] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    try {
      const response = await api.get("/task");
      setTasks(response.data.tasks);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchAndSetTasks = async () => {
      await fetchTasks();
    };
    fetchAndSetTasks();
  }, []);

  const handleCreate = async () => {
    try {
      const response = await api.post("/task", {
        task: taskValue,
        isCompleted: false,
      });
      if (response.status === 200) {
        setTaskValue("");
        await fetchTasks();
        toast.info("할 일을 추가했습니다.");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleUpdate = async (id: string) => {
    const task = tasks.find((t) => t._id === id);
    if (!task) return;
    try {
      const response = await api.put(`/task/${id}`, {
        isCompleted: !task.isCompleted,
      });
      console.log(response);
      if (response.status === 200) {
        await fetchTasks();
        toast.success(
          !task.isCompleted
            ? "할일을 완료했습니다."
            : "진행중으로 변경했습니다."
        );
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async (id: string) => {
    try {
      const response = await api.delete(`/task/${id}`);
      if (response.status === 200) {
        await fetchTasks();
        toast.error("할 일을 삭제했습니다.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col bg-violet-400 p-3 lg:p-5">
        <div className="bg-purple-50 w-full max-w-lg lg:mx-auto flex-1 rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="flex flex-col gap-8">
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
                onEnter={handleCreate}
              />
              <Button onClick={handleCreate}>
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
                tasks.map((t, index) => {
                  return (
                    <TodoItem
                      key={`${t.task}-${index}`}
                      task={t.task}
                      isCompleted={t.isCompleted}
                      handleToggle={() => handleUpdate(t._id)}
                      handleDelete={() => handleDelete(t._id)}
                    />
                  );
                })
              )}
            </div>
          </div>
        </div>
        <ToastContainer
          className="w-4/5"
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </>
  );
}

export default App;
