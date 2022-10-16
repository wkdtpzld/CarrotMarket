import { ImageURL } from "@libs/client/utils";
import Image from "next/image";

interface IProps {
    Name: string;
    Date: string;
    Comment: string;
    imageId: string;
}


const CommentItem = ({Name, Date, Comment, imageId}:IProps) => {

    const onErrorHandler = (ev: any) => {
        ev.target.style = "display: none"      
    }

    return (
        <div className='px-4 flex items-start space-x-3 my-5'>
            <div className='w-10 h-10 bg-slate-300 rounded-full'>
                <Image
                    src={imageId}
                    width={40}
                    height={40}
                    alt={Name}
                    className='w-10 h-10 bg-slate-300 rounded-full'
                    onError={onErrorHandler}
                />
            </div>
            <div>
                <span className='text-sm block font-medium text-gray-800'>{Name}</span>
                <span className='text-xs block font-medium text-gray-500'>{Date}</span>
                <p className='text-gray-700 mt-2 text-sm'>{Comment}</p>
            </div>
        </div>
    )
}

export default CommentItem;