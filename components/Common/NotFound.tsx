
interface IProps {
    Content: string;
}

const NotFound = ({ Content }: IProps) => {

    return (
        <div className='my-12'>
            <div className='text-center flex flex-col'>
                <span className='text-2xl text-gray-800 font-semibold'>
                    {Content}
                </span>
                <div className='w-32 h-32 bg-slate-300 flex m-auto mt-20'/>
            </div>
        </div>
    )
}

export default NotFound;