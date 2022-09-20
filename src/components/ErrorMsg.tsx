type ErrorTypes = {
    msg: string,
}

export const ErrorMsg = ({ msg }: ErrorTypes) => {

    return (
        <h4 className='w-full p-1  bg-red-500 text-slate-100 text-sm text-center font-semibold capitalize rounded-sm'>
            {msg}
        </h4>
    )
}