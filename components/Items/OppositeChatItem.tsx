
interface IProps {
    Message: string;
}

const OppositeCahtItem = ({Message}:IProps) => {

    return (
        <div className='flex items-start space-x-2'>
            <div className='w-8 h-8 rounded-full bg-slate-300' />
            <div className='w-1/2 text-sm text-gray-700 p-2 border rounded-md
                border-gray-400'>
                <p>{Message}</p>
            </div>
        </div>
    )
}

export default OppositeCahtItem;