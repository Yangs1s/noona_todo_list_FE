type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ ...rest }: ButtonProps) => {
  return (
    <button
      className="bg-violet-500 hover:bg-violet-600 px-6 py-3 rounded-xl text-white font-medium shadow-lg transition-all duration-300 cursor-pointer active:scale-95"
      {...rest}
    >
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
    </button>
  );
};

export default Button;
