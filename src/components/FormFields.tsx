import React from "react"

type InputTypes = {
    type: "text" | "password" | 'email',
    name: string,
    value: string,
    placeholder: string,
    label?: string,
    onChange: (e: React.ChangeEvent) => void,


}
export const InputField = ({ name, onChange, placeholder, type, value }: InputTypes) => {

    return (
        <input className='w-full p-2  bg-black/40 text-slate-200 ' type={type} name={name} value={value} placeholder={placeholder} onChange={onChange} />
    )
}