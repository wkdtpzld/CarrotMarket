import CommunityItemIcon from "./CommunityItemIcon";

interface IProps {
    Question: string;
    Time: string;
    Name: string;
    Attention: number;
    Answer: number;
}

const CommunityItem = ({Question, Time, Name, Answer, Attention}:IProps) => {
    return (
        <div className='flex flex-col items-start'>
            <span className='flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800'
            >동네질문</span>
            <div className='mt-2 text-gray-700'>
                <span className='text-orange-500 font-medium'>Q.</span> {Question}
            </div>
            <div className='mt-5 flex items-center justify-between w-full text-gray-500 font-medium text-xs'>
                <span>{Name}</span>
                <span>{Time}</span>
            </div>
            <CommunityItemIcon
                Attention={Attention}
                Answer={Answer}
            />
        </div>
    )
}

export default CommunityItem;