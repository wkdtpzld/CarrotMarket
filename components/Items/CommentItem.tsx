
interface IProps {
    Name: string;
    Date: string;
    Comment: string;
}


const CommentItem = ({Name, Date, Comment}:IProps) => {

    return (
        <div className='px-4 flex items-start space-x-3 my-5'>
            <div className='w-8 h-8 bg-slate-300 rounded-full' />
            <div>
                <span className='text-sm block font-medium text-gray-800'>{Name}</span>
                <span className='text-xs block font-medium text-gray-500'>{Date}</span>
                <p className='text-gray-700 mt-2'>{Comment}</p>
            </div>
        </div>
    )
}

export default CommentItem;