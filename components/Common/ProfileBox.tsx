
interface IProps {
    Name: string;
    isMine: boolean
}

const ProfileBox = ({ Name, isMine }: IProps) => {

    return (
        <>
            <div className='w-16 h-16 bg-slate-300 rounded-full' />
            <div className='flex flex-col'>
                <span className='font-medium text-gray-800'>{Name}</span>
                <span className='text-sm text-gray-700'>{isMine ? `Edit profile →` : "View profile →"}</span>
            </div>
        </>
    )
}

export default ProfileBox;