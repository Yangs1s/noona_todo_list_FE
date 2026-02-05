interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button = ({ children, ...rest }: ButtonProps) => {
  return (
    <button
      className="bg-violet-500 hover:bg-violet-600 px-6 py-3 rounded-xl text-white font-medium shadow-lg transition-all duration-300 cursor-pointer active:scale-95"
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
