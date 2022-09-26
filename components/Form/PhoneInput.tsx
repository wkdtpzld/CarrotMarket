
interface IProps {
    Name: string;
    Label: string;

}

const PhoneInput = ({Name, Label}:IProps) => {

    return (
        <>
            <label htmlFor={Label} className="text-sm font-medium text-gray-700">
                {Name}
            </label>
            <div className="flex rounded-sm shadow-sm">
                <span className="flex items-center justify-center px-3 rounded-l-md 
                    border border-r-0 border-gray-300 bg-gray-50 text-gray-500 select-none">+82</span>
                <input id={Label} className="appearance-none w-full px-3 py-2 border
                border-gray-300 shadow-sm rounded-md rounded-l-none placeholder-gray-400 
                focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    type="number"
                    required />
            </div>
        </>
    )
}

export default PhoneInput;