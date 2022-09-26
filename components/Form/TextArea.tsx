
interface IProps {
    Placeholder: string;
    Name?: string;
}

const TextArea = ({Placeholder, Name}:IProps) => {

    return (
        <div>
            {Name ? <label className='text-sm font-medium text-gray-700'>{Name}</label> : null}
            <div>
                <textarea rows={4} className="mt-1 shadow-sm w-full focus:ring-orange-500 rounded-md
                    border-gray-300 focus:border-orange-500"
                    placeholder={Placeholder}
                />
            </div>
        </div>
    )
}

export default TextArea;