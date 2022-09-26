
interface IProps {
    title: string;
    IconD: string;
}

const ProfileMenu = ({title, IconD}:IProps) => {

    return (
        <div className='flex flex-col items-center'>
            <div className='w-14 h-14 text-white bg-orange-500 flex items-center justify-center rounded-full'>
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d={IconD}
                    ></path>
                </svg>
            </div>
            <span className='text-sm font-medium text-gray-700 mt-2'>{title}</span>
        </div>
    )
};

export default ProfileMenu;