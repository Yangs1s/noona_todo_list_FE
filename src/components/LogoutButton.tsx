import api from "../utils/api";

const LogoutButton = ({ setUser }: { setUser: (user: null) => void }) => {
  const handleLogout = async () => {
    const response = await api.get("/user/logout");
    if (response.status === 200) {
      localStorage.removeItem("token");
      setUser(null);
    }
  };
  return (
    <div className="flex justify-center absolute bottom-2 left-0 right-0">
      <button
        className="w-[120px] text-purple-500 cursor-pointer"
        onClick={handleLogout}
      >
        로그아웃
      </button>
    </div>
  );
};

export default LogoutButton;
