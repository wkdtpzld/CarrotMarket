import { cls } from '../../libs/client/utils';

interface IProps {
    Attention: number;
    Answer: number;
    onClick?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
    isWondering?: boolean;
}

const CommunityItemIcon = ({Attention, Answer, onClick, isWondering}:IProps) => {

    return (
        <div className='flex space-x-5 mt-3 text-gray-700 py-2.5 border-t border-b-[2px] w-full'>
            <button
                className={cls('flex space-x-2 text-sm items-center mx-4',
                    isWondering ? "text-teal-600" : "")}
                onClick={onClick}>
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                    </svg>
                    <span>궁금해요 {Attention}</span>
                </button>
                <span className='flex space-x-2 text-sm items-center'>
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        ></path>
                    </svg>
                    <span>답변 {Answer}</span>
                </span>
            </div>
    )
}

export default CommunityItemIcon;