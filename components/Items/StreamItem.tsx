import Image from "next/image";
import Link from "next/link";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

interface IProps {
    Name: string;
    id: number;
    streamId: string;
}



const StreamItem = ({Name, id, streamId}:IProps) => {

    const onErrorHandler = (ev: any) => {
        ev.target.style = "display: none"      
    }

    return (
        <>
        <div className="pt-4 px-4">
            <Link href={`stream/${id}`}>
                <a>
                    <div className="bg-slate-300 aspect-video rounded-md relative">
                        <Image
                            src={`https://videodelivery.net/${streamId}/thumbnails/thumbnail.jpg`}
                            layout="fill"
                            alt={String(id)}
                            onError={onErrorHandler}
                        >
                        </Image>
                    </div>
                </a>
            </Link>
            <h3 className='text-gray-700 text-lg mt-2'>
                {Name}
            </h3>
        </div>
        </>
    )
}

export default StreamItem;