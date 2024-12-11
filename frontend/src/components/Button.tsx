import { ReactElement } from "react";

type Variants = "primary" | "secondary";

// TODO: Add Hover states
interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  variant: Variants;
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick: () => void;
  className?: string;
  loading?: boolean;
}

const variantStyles: Record<Variants, string> = {
  primary:
    "bg-purple-600 text-white hover:shadow-md hover:shadow-purple-400 active:scale-[0.9] transition-all",
  secondary: "bg-purple-300 text-purple-600",
};

const sizeStyles = {
  sm: "py-1 px-2",
  md: "py-2 px-4",
  lg: "py-3 px-6",
};

const defaultStyles = "flex px-4 py-2 justify-center items-center rounded-lg";

export const Button = (props: ButtonProps) => {
  return (
    <>
      <button
        className={`${props.className} ${
          variantStyles[props.variant]
        } ${defaultStyles} ${sizeStyles[props.size]} 
        ${props.loading ? "opacity-45" : ""}
        `}
        disabled={props.loading}
        onClick={props.onClick}
      >
        {props.startIcon ? <div className="pr-2">{props.startIcon}</div> : null}
        <div>{props.loading ? props.text + "..." : props.text}</div>
        {props.endIcon ? <div className="pl-2">{props.endIcon}</div> : null}
      </button>
    </>
  );
};
