
interface IProps {
    Content: string;
    onClick?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
}

const SubmitBtn = ({Content, onClick}:IProps) => {

    return (
        <button
            onClick={onClick}
            className="mt-6 bg-orange-500 hover:bg-orange-600 
            text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium
            focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none w-full" >
            {Content}
        </button>
    )
}

export default SubmitBtn