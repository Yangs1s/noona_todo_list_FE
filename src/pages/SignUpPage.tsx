import { useState } from "react";
import Layout from "../components/layout/Layout";
import Input from "../components/shared/Input";
import { LockIcon, MailIcon, UserIcon } from "../components/icons";
import Button from "../components/shared/Button";
import { Link, Navigate, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { EmailCheckButton } from "../components/EmailCheckButton";
import { type User } from "../types/user";

const SignUpPage = ({ user }: { user: User | null }) => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [isEmailChecked, setIsEmailChecked] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (password !== passwordConfirm) {
      toast.error("비밀번호가 일치하지 않습니다");
      return;
    }
    try {
      const response = await api.post("/user", {
        email,
        password,
        name: username,
      });
      if (response.status === 200) {
        toast.success("회원가입 성공");
        navigate("/");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message);
      }
    }
  };

  if (user) {
    return <Navigate to="/todo" />;
  }
  return (
    <Layout>
      <div className="bg-purple-50 space-y-12 w-full max-w-md lg:mx-auto min-h-[50dvh] rounded-[40px] shadow-xl p-8 border border-gray-100">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-violet-600">
            My Todo List 시작하기
          </h1>
          <p className="text-sm text-gray-400 mt-1">오늘도 화이팅!</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            icon={<UserIcon />}
            label="이름"
            name="name"
            placeholder="이름을 입력해주세요"
            value={username}
            setValue={setUsername}
          />
          <Input
            icon={<MailIcon />}
            label="이메일"
            name="email"
            value={email}
            setValue={setEmail}
            placeholder="example@email.com"
          />
          <EmailCheckButton
            email={email}
            setIsEmailChecked={setIsEmailChecked}
          />
          <Input
            icon={<LockIcon />}
            label="비밀번호"
            name="password"
            type="password"
            value={password}
            setValue={setPassword}
            placeholder="비밀번호를 입력해주세요"
          />
          <Input
            icon={<LockIcon />}
            label="비밀번호 확인"
            type="password"
            name="passwordConfirm"
            value={passwordConfirm}
            setValue={setPasswordConfirm}
            placeholder="비밀번호를 입력해주세요"
          />
          {passwordConfirm && password !== passwordConfirm && (
            <span className="text-red-500 text-sm">
              비밀번호가 일치하지 않습니다
            </span>
          )}
          <Button
            type="submit"
            className="w-full"
            disabled={
              // !email ||
              // !username ||
              // !password ||
              // !passwordConfirm ||
              !isEmailChecked
            }
          >
            가입하기
          </Button>
        </form>
        <div className="w-full flex justify-center">
          <div className="space-x-2">
            <span>계정이 이미 있으신가요?</span>
            <Link to={"/"} className="text-purple-500">
              로그인
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignUpPage;
