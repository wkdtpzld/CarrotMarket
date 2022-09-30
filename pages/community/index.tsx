import type { NextPage } from 'next'
import AddBtn from '@components/Icon/AddBtn';
import CommunityItem from '@components/Items/CommunityItem';
import Layout from '@components/Common/Layout';
import useSWR from 'swr';
import { Post, User } from '@prisma/client';
import CommunityItemIcon from '@components/Icon/CommunityItemIcon';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

interface PostWithUser extends Post {
    user: User,
    _count: {
        answers: number;
        wondering: number;
    }
}

interface PostsResponse {
    ok: boolean;
    posts: PostWithUser[]
}

const Community: NextPage = () => { 

    const { data } = useSWR<PostsResponse>(`/api/posts`);

    return (
        <Layout title='동내생활' hasTabBar>
            <div className='py-16 px-4 space-y-8'>
            {data
                ? (
                    <>
                    {data?.posts.map((post) => (
                        <CommunityItem
                            key={post.id}
                            Question={post?.question}
                            Name={post.user.name}
                            Answer={post._count.answers}
                            Attention={post._count.wondering}
                            Time="12 일전"
                            id={post.id}
                        />
                    ))}
                    </>
                ) : (
                    <>
                    {[1,1,1,1,1,1].map((_, i) => (
                        <div key={i} className="flex flex-col items-start">
                            <span
                                className='flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800'>
                                동네질문</span>
                            <div className='mt-2 text-gray-700'>
                                <span className='text-orange-500 font-medium mr-2'>Q.</span>
                                <Skeleton width={200}/>
                            </div>
                            <div className='mt-5 flex items-center justify-between w-full text-gray-500 font-medium text-xs'>
                                <Skeleton width={50} />
                                <Skeleton width={30} />
                            </div>
                            <CommunityItemIcon
                                Attention={0}
                                Answer={0}
                            />
                        </div>
                    ))}
                    </>    
                )}
                <AddBtn IconD='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z' />
            </div>
        </Layout>
    )
}

export default Community;