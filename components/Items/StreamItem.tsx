
interface IProps {
    Name: string
}


const StreamItem = ({Name}:IProps) => {

    return (
        <div className="pt-4 px-4">
            <div className='bg-slate-300 aspect-video rounded-md ' />
            <h3 className='text-gray-700 text-lg mt-2'>
                {Name}
            </h3>
        </div>
    )
}

export default StreamItem;