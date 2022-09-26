
interface IProps {
    Label: string;
    Name: string;
    type: string;
}

const NormalInput = ({Label, Name, type}:IProps) => {

    return (
        <>
            <label htmlFor={Label} className="text-sm font-medium text-gray-700">
                    {Name}
            </label>
            <div className="mt-1">
                <input id={Label} type={type}
                    className="appearance-none w-full px-3 py-2 border
                    border-gray-300 shadow-sm rounded-md placeholder-gray-400 
                    focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    required />
            </div>
        </>
    )
}

export default NormalInput;