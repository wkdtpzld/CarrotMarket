import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { cls } from '../../libs/client/utils';

interface IProps {
    Placeholder: string;
    Name?: string;
    register: UseFormRegisterReturn;
    required?: boolean;
    error?: FieldError
}

const TextArea = ({Placeholder, Name, register, required, error}:IProps) => {

    return (
        <div>
            {Name ? <label className='text-sm font-medium text-gray-700'>{Name}</label> : null}
            <div>
                <textarea rows={4} className={cls("mt-1 shadow-sm w-full rounded-md",
                    error?.message
                        ? "focus:ring-red-500 border-gray-300 focus:border-red-500 focus:ring-2"
                        : "focus:ring-orange-500 border-gray-300 focus:border-orange-500")}
                    placeholder={Placeholder}
                    {...register}
                    required={required}
                />
                {error?.message ?
                    <span className="text-sm text-red-600 font-medium ">{error.message}</span>
                : null}
            </div>
        </div>
    )
}

export default TextArea;