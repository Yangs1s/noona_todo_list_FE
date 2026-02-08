import { useNavigate } from "react-router-dom";
import api from "../utils/api";
const LogoutButton = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const response = await api.get("/user/logout");
    localStorage.removeItem("token");
    if (response.status === 200) {
      navigate("/");
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
