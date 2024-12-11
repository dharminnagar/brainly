interface InputProps {
  placeholder: string;
  className: string;
  reference?: any;
}

export const Input = ({ placeholder, className, reference }: InputProps) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      ref={reference}
      className={`border rounded-md p-2 w-full focus:border-purple-500 outline-none focus:shadow-md focus:shadow-purple-400 ${className}`}
    />
  );
};
