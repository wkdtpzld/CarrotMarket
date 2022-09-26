
interface IProps {
    Name: string;
    Price: number;
}

const SilmilarItem = ({Name, Price}:IProps) => {

    return (
        <div>
            <div className='h-56 w-full bg-slate-300 mb-4'/>
            <h3 className='-mb-1 text-gray-700'>{Name}</h3>
            <span className='text-sm font-medium text-gray-900'>${Price}</span>
        </div>
    )
}

export default SilmilarItem