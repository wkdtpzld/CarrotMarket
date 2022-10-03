import type { NextPage } from 'next'
import AddBtn from '@components/Icon/AddBtn';
import CommunityItem from '@components/Items/CommunityItem';
import Layout from '@components/Common/Layout';
import { Post, User } from '@prisma/client';
import CommunityItemIcon from '@components/Icon/CommunityItemIcon';
import useSWRInfinite from 'swr/infinite';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import Link from 'next/link';
import useCoords from '../../libs/client/useCoords';
import { useState, useEffect } from 'react';
import React from 'react';
import TransformDate from '../../libs/client/TransformDate';
import { useInfiniteScroll } from '../../libs/client/useInfiniteScroll';

interface PostWithUser extends Post {
    user: User,
    _count: {
        answers: number;
        wondering: number;
    }
}

interface PostsResponse {
    ok: boolean;
    posts: PostWithUser[],
    pages: number;
}

const Community: NextPage = () => { 

    const getKey = (pageIndex: number, previousPageData: PostsResponse) => {
        if (latitude && longitude) {
            if (pageIndex === 0) return `/api/posts?page=1&latitude=${latitude}&longitude=${longitude}&level=${level}`;
            if (pageIndex + 1 > previousPageData.pages) return null;
            return `/api/posts?page=${pageIndex + 1}&latitude=${latitude}&longitude=${longitude}&level=${level}`;
        } else {
            return null;
        }
    }
    
    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    

    const { latitude, longitude } = useCoords();
    const [level, setLevel] = useState(0.01);   

    const onLevelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLevel((current) => current = Number(event.target.value));
        mutate();
    };

    const page = useInfiniteScroll();
    const { data, setSize, mutate } = useSWRInfinite<PostsResponse>(getKey, fetcher);
    
    useEffect(() => {
        setSize(page)
    }, [setSize, page]);

    const posts = data ? data.map(item => item.posts).flat() : [];

    return (
        <Layout title='동내생활' hasTabBar>
            <div className='py-8 px-4 space-y-8'>
                <div className='flex space-x-4 justify-end mr-4'>
                    <span className='text-sm flex justify-center items-center'>탐색 레벨</span>
                    <select
                        value={level}
                        onChange={onLevelChange}
                        className='rounded-md focus:ring-2 focus:ring-orange-400 focus:border-orange-400
                        border-gray-300 text-sm hover:border-orange-400'>
                        <option className='bg-gray-100' value={0.005}>Low</option>
                        <option className='bg-gray-100' value={0.01}>Middle</option>
                        <option className='bg-gray-100' value={0.015}>High</option>
                    </select>
                </div>
            {data
                ? (
                    <>
                    {posts.map((post) => (
                        <CommunityItem
                            key={post?.id}
                            Question={post?.question}
                            Name={post?.user.name}
                            Answer={post?._count.answers}
                            Attention={post?._count.wondering}
                            Time={TransformDate(post?.createdAt)}
                            id={post?.id}
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
                <Link href="/community/write">
                    <a>
                        <AddBtn IconD='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z' />
                    </a>
                </Link>
            </div>
        </Layout>
    )
}

export default Community;