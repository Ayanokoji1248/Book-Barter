import type { FormEvent } from "react"

interface buttonProp {
    text: string,
    onClick?: (e: FormEvent) => void,
    widthFull?: boolean,
    variant: "primary" | "secondary" | "danger" | "success"
}

const styleVariant = {
    primary: "bg-blue-500 text-white font-medium p-3 rounded-md text-sm hover:bg-blue-600 transition-all duration-300 cursor-pointer text-center",
    success: "bg-green-500 text-white font-medium p-2 rounded-md text-sm hover:bg-green-600 transition-all duration-300 cursor-pointer text-center",
    danger: "bg-red-500 text-white font-medium p-2 rounded-md text-sm hover:bg-red-600 transition-all duration-300 cursor-pointer text-center",
    secondary: "bg-white text-blue-500 border-2 border-blue-500 font-medium p-2 rounded-md text-sm hover:bg-blue-100 transition-all duration-300 cursor-pointer text-center"
}

const Button = ({ text, variant, onClick, widthFull }: buttonProp) => {
    return (
        <div className={`${widthFull ? "w-full" : "w-fit"} ${styleVariant[variant]}`} onClick={onClick}>{text}</div>
    )
}

export default Button