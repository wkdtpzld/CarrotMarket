
interface IProps{
    IconD: string;
}

const AddBtn = ({ IconD }:IProps) => { 

    return (
        <>
        <button className='fixed bottom-24 right-5 bg-orange-400 rounded-full p-4 text-white shadow-xl
            hover:bg-orange-500 cursor-pointer transition-colors border-none'>
            <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={IconD}
                />
            </svg>
        </button>
        </>
    )
}

export default AddBtn