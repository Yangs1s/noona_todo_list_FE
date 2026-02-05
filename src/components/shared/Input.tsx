import type { Dispatch, SetStateAction } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  setValue: Dispatch<SetStateAction<string>>;
  onEnter?: () => void;
}

const Input = ({ setValue, onEnter, ...rest }: InputProps) => {
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
    <input
      {...rest}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      type="text"
      placeholder="새로운 할 일을 입력하세요..."
      className="flex-1 px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-violet-300 focus:ring-4 focus:ring-violet-100 transition-all duration-300"
    />
  );
};

export default Input;
