import Image from 'next/image';
import { cls, ImageURL } from '@libs/client/utils';
interface IProps {
    Message: string;
    type: "opposite" | "inside";
    imageId: string
}


const ChattingBubble = ({ Message, type, imageId }: IProps) => {

    const onErrorHandler = (ev: any) => {
        ev.target.style = "display: none"      
    }

    return (
        <div className={cls(type === "inside"
            ? "flex flex-row-reverse items-start space-x-2 space-x-reverse mr-4"
            : "flex items-start space-x-2")}>
            <div className='w-10 h-10 bg-slate-300 rounded-full'>
                <Image
                    src={imageId}
                    width={40}
                    height={40}
                    alt={Message}
                    className='w-10 h-10 bg-slate-300 rounded-full'
                    onError={onErrorHandler}
                />
            </div>
            <div className='w-1/2 text-sm text-gray-700 p-2 border rounded-md
                border-gray-400'>
                <p>{Message}</p>
            </div> 
        </div>
    )
}

export default ChattingBubble;