import { ImageURL } from "@libs/client/utils";
import Image from "next/image";

interface IProps {
    Name: string;
    Price: number;
    image: string;
}

const SilmilarItem = ({Name, Price, image}:IProps) => {

    const onErrorHandler = (ev: any) => {
        ev.target.style = "display: none"      
    }

    return (
        <div>
            <div className='h-56 w-full bg-slate-300 mb-4 rounded-md border-none'>
                <Image
                    src={ImageURL(image, "public")}
                    width={225}
                    height={224}
                    alt={Name}
                    className='rounded-md'
                    onError={onErrorHandler}
                />
            </div>
            <h3 className='-mb-1 text-gray-700'>{Name}</h3>
            <span className='text-sm font-medium text-gray-900'>${Price}</span>
        </div>
    )
}

export default SilmilarItem