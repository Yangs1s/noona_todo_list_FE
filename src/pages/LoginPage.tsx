import { useState } from "react";
import Layout from "../components/layout/Layout";
import Input from "../components/shared/Input";
import { LockIcon, MailIcon } from "../components/icons";
import Button from "../components/shared/Button";
import { Link, Navigate, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { toast } from "react-toastify";
import type { User } from "../types/user";

const LoginPage = ({
  user,
  setUser,
}: {
  user: User | null;
  setUser: (user: User) => void;
}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const response = await api.post("/user/login", { email, password });
      if (response.status === 200) {
        toast.success("로그인 성공");
        setUser(response.data.user);
        navigate("/todo");
        localStorage.setItem("token", response.data.token);
      }
    } catch (error) {
      console.error(error);
    }
  };
  if (user) {
    return <Navigate to="/todo" />;
  }
  return (
    <Layout>
      <div className="bg-purple-50 space-y-12 w-full max-w-md lg:mx-auto min-h-[40dvh] rounded-[40px] shadow-xl p-8 border border-gray-100">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-violet-600">
            My Todo List Login
          </h1>
          <p className="text-sm text-gray-400 mt-1">오늘도 화이팅!</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            icon={<MailIcon />}
            label="이메일"
            name="email"
            value={email}
            setValue={setEmail}
            placeholder="example@email.com"
          />
          <Input
            icon={<LockIcon />}
            label="비밀번호"
            name="password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            setValue={setPassword}
          />
          <Button type="submit" className="w-full">
            로그인
          </Button>
        </form>
        <div className="w-full flex justify-center">
          <div className="space-x-2">
            <span>계정이 없으신가요?</span>
            <Link to={"/signup"} className="text-purple-500">
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
