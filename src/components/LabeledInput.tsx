import type { ChangeEvent } from "react"

interface LabeledInputProp {
    labelName: string,
    placeholder: string,
    type: string,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
    value?: string,
    min?: number
}

const LabeledInput = ({ labelName, placeholder, type, onChange, value, min }: LabeledInputProp) => {
    return (
        <>
            <label className="text-sm font-medium">{labelName}</label>
            <input type={type} min={min} onChange={onChange} value={value} className="w-full p-2 py-3 border-[1px] border-zinc-400 rounded-md text-sm font-medium  focus:ring-[2px] focus:ring-blue-500 outline-none transition-all duration-300   " required placeholder={placeholder} />
        </>
    )
}

export default LabeledInput