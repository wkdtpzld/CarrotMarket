import { ImageURL } from "@libs/client/utils";
import Image from "next/image";

interface IProps {
    Name: string;
    LastChat: string;
    imageId: string;
}

const ChatItem = ({Name, LastChat, imageId}:IProps) => {

    const onErrorHandler = (ev: any) => {
        ev.target.style = "display: none"      
    }

    return (
        <div className='flex mb-5 py-3 items-center space-x-3 px-4'>
            <div className='w-10 h-10 bg-slate-300 rounded-full'>
                <Image
                    src={ImageURL(imageId, "avatar")}
                    width={40}
                    height={40}
                    alt={Name}
                    className='w-10 h-10 bg-slate-300 rounded-full'
                    onError={onErrorHandler}
                />
            </div>
            <div>
                <p className='text-gray-700'>{Name}</p>
                <p className='text-xs text-gray-500'>{LastChat}</p>
            </div>
        </div>
    )
}

export default ChatItem;