import type { UseFormRegisterReturn } from "react-hook-form/dist/types";
import { FieldError } from 'react-hook-form';

interface IProps {
    Label: string;
    Name: string;
    kind: "email" | "phone" | "price";
    register: UseFormRegisterReturn;
    type: string;
    required?: boolean
    error?: FieldError
}

const NormalInput = ({Label, Name, type, register, kind, required, error}:IProps) => {

    return (
        <>
            {kind === "email"
                ? (
                    <>
                    <label htmlFor={Name} className="text-sm font-medium text-gray-700">
                        {Label}
                    </label>
                    <div className="mt-1">
                        <input id={Name} type={type}
                            className="appearance-none w-full px-3 py-2 border
                            border-gray-300 shadow-sm rounded-md placeholder-gray-400 
                            focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                            {...register}
                            required={required} />
                    </div>
                    </>
                ) : (
                null
            )}
            {kind === "price"
                ? (
                    <div>
                        <label htmlFor={Label} className='text-sm font-medium text-gray-700'>Price</label>
                        <div className='rounded-md shadow-sm relative flex items-center '>
                            <div className='absolute left-0 pl-3 flex items-center justify-center pointer-events-none'>
                                <span className='text-gray-500 text-sm'>$</span>
                            </div>
                            <input
                                id={Label}
                                type={type}
                                placeholder="0.00"
                                {...register}
                                className='appearance-none w-full px-3 py-2 pl-7 border
                                    border-gray-300 shadow-sm rounded-md placeholder-gray-400 
                                    focus:outline-none focus:ring-orange-500 focus:border-orange-500'
                                required={required}
                            />
                            <div className='absolute right-0 pr-3 flex items-center pointer-events-none'>
                                <span>USD</span>
                            </div>
                        </div>
                    </div>
                ) : (
                null
            )}
            {kind === "phone"
                ? (
                    <>
                        <label htmlFor={Name} className="text-sm font-medium text-gray-700">
                            {Label}
                        </label>
                        <div className="flex rounded-sm shadow-sm mt-1">
                            <span className="flex items-center justify-center px-3 rounded-l-md 
                                border border-r-0 border-gray-300 bg-gray-50 text-gray-500 select-none">+82</span>
                            <input
                                id={Name}
                                {...register}
                                type={type}
                                required={required}
                                className="appearance-none w-full px-3 py-2 border
                                border-gray-300 shadow-sm rounded-md rounded-l-none placeholder-gray-400 
                                focus:outline-none focus:ring-orange-500 focus:border-orange-500"/>
                        </div>
                    </>
                ) : (
                null
                )}
            <div className="mt-2">
            {error?.message ?
                <span className="text-sm text-red-600 font-medium ">{error.message}</span>
                : null}
            </div>
        </>
    )
}

export default NormalInput;