import Link from "next/link";

interface IProps {
    Name: string;
    id: number;
}


const StreamItem = ({Name, id}:IProps) => {

    return (
        <>
        <div className="pt-4 px-4">
            <Link href={`stream/${id}`}>
                <a>
                    <div className='bg-slate-300 aspect-video rounded-md ' />
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