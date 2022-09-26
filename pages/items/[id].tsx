import type { NextPage } from 'next'
import SilmilarItem from '../../components/Items/SimilarItem';
import Layout from '../../components/Common/Layout';
import ProfileBox from '../../components/Common/ProfileBox';

const ItemDetail: NextPage = () => { 

    return (
        <Layout canGoBack>
            <div className='px-4 py-10'>
                <div className='mb-6'>
                    <div className='h-96 bg-slate-300 mb-4' />
                    <div className='flex items-center space-x-4'>
                        <ProfileBox
                            Name='김기태'
                            isMine={false}
                        />
                    </div>
                    <div className='mt-10'>
                        <h1 className='text-3xl font-bold text-gray-800'>Galaxy S50</h1>
                        <span className='text-3xl mt-3 block'>$140</span>
                        <p className='text-base my-6 text-gray-700'>
                            My money&apos;s in that office, right? If she start giving me some
                            bullshit about it ain&apos;t there, and we got to go someplace else
                            and get it, I&apos;m gonna shoot you in the head then and there.
                            Then I&apos;m gonna shoot that bitch in the kneecaps, find out where
                            my goddamn money is. She gonna tell me too. Hey, look at me when
                            I&apos;m talking to you, motherfucker. You listen: we go in there,
                            and that ni**a Winston or anybody else is in there, you the first
                            motherfucker to get shot. You understand?
                        </p>
                        <div className='flex items-center justify-between space-x-2'>
                                <button className='flex-1 bg-orange-500 text-white py-3 rounded-md font-medium hover:bg-orange-600
                                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'>Talk to seller</button>
                                <button className='p-3 flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100
                                rounded-md'>
                                    <svg
                                    className="h-6 w-6 "
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                    >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                    />
                                    </svg>
                            </button>
                        </div>
                    </div>
                    </div>
                    <div className=''>
                    <h2 className='text-2xl font-bold text-gray-800'>Similar items</h2>
                    <div className='grid grid-cols-2 gap-4 mt-6'>
                        {[1, 2, 3, 4, 5, 6].map((_, i) => (
                            <SilmilarItem
                                key={i}
                                Name='Galaxy S620'
                                Price={6}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ItemDetail;