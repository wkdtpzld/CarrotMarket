
interface IProps {
    Content: string
}

const SubmitBtn = ({Content}:IProps) => {

    return (
        <button className="mt-6 bg-orange-500 hover:bg-orange-600 
            text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium
            focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none w-full" >
            {Content}
        </button>
    )
}

export default SubmitBtn