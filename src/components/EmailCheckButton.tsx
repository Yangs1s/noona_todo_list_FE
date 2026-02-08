import { AxiosError } from "axios";
import Button from "./shared/Button";
import api from "../utils/api";
import { toast } from "react-toastify";

export const EmailCheckButton = ({
  email,
  setIsEmailChecked,
}: {
  email: string;
  setIsEmailChecked: (isEmailChecked: boolean) => void;
}) => {
  const handleCheckEmail = async () => {
    try {
      const response = await api.post("/user/check-email", { email });
      if (response.status === 200) {
        toast.success("중복체크 성공");
        setIsEmailChecked(true);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message);
      }
    }
  };
  return (
    <div className="flex flex-col gap-1 w-full">
      <Button type="button" className="w-full" onClick={handleCheckEmail}>
        중복체크
      </Button>
    </div>
  );
};
