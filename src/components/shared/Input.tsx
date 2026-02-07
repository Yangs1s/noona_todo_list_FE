import type { Dispatch, SetStateAction } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  setValue: Dispatch<SetStateAction<string>>;
  onEnter?: () => void;
  icon?: React.ReactNode;
  label?: string;
}

const Input = ({ setValue, icon, label, onEnter, ...rest }: InputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 브라우저의 고유 이벤트가 필요하면 nativeEvent를 사용해야 함
    // 한글 입력시 입력한 검색어가 두번씩 입력되는 문제가 있었음.
    // 한글은 자음모음의 조합으로 한음절이 만들어져, 글자중에 조합인지 아닌지를 알수 없음.
    //
    //isComposing: 입력문자가 조합문자인지 아닌지를 boolean 값으로 반환

    if (e.nativeEvent.isComposing) return;

    if (e.key === "Enter" && onEnter) {
      e.preventDefault();
      onEnter();
    }
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <p className="text-sm text-gray-600">{label}</p>}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </span>
        )}
        <input
          {...rest}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className={`w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-violet-300 focus:ring-4 focus:ring-violet-100 transition-all duration-300 ${
            icon ? "pl-10" : ""
          }`}
        />
      </div>
    </div>
  );
};

export default Input;
