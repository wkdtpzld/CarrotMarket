
interface IProps {
    Name: string;
    LastChat: string;
}

const ChatItem = ({Name, LastChat}:IProps) => {

    return (
        <div className='flex mb-5 py-3 items-center space-x-3 px-4'>
            <div className='w-10 h-10 rounded-full bg-slate-300'/>
            <div>
                <p className='text-gray-700'>{Name}</p>
                <p className='text-xs text-gray-500'>{LastChat}</p>
            </div>
        </div>
    )
}

export default ChatItem;