import Star from "@components/Icon/Star";

interface IProps {
    name: string;
    score: number;
    review: string;
}

const ReviewsItem = ({name, score, review }:IProps) => {

    return (
        <>
        <div className='flex items-center space-x-4'>
            <div className='w-12 h-12 rounded-full bg-slate-300'/>
            <div>
                <h4 className='text-sm font-bold text-gray-800'>{name}</h4>
                <div className='flex items-center'>
                    {[1,2,3,4,5].map(star => (
                        <>
                            <Star
                                type={score >= star ? "Fill" : "Empty"}
                                key={star} />
                        </>
                    ))}
                </div>
            </div>
        </div>
        <div className='mt-4 text-gray-600 text-[15px]'>
            <p>
            {review}
            </p>
        </div>
        </>
    )
}

export default ReviewsItem;