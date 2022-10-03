import type { NextPage } from 'next'
import AddBtn from '@components/Icon/AddBtn';
import StreamItem from '@components/Items/StreamItem';
import Layout from '@components/Common/Layout';
import Link from 'next/link';
import { Stream } from '@prisma/client';
import useSWRInfinite from 'swr/infinite';
import { useEffect } from 'react';
import { useInfiniteScroll } from '@libs/client/useInfiniteScroll';

interface StreamsResponse {
    ok: boolean,
    streams: Stream[];
    pages: number;
}

const getKey = (pageIndex: number, previousPageData: StreamsResponse) => {
    if (pageIndex === 0) return `/api/streams?page=1`;
    if (pageIndex + 1 > previousPageData.pages) return null;
    return `/api/streams?page=${pageIndex + 1}`;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Stream: NextPage = () => { 

    const { data, setSize } = useSWRInfinite<StreamsResponse>(getKey, fetcher);
    const streams = data ? data.map((item) => item.streams).flat() : [];
    const page = useInfiniteScroll();
    useEffect(() => {
        setSize(page);
    }, [setSize, page]);

    return (
        <Layout title='Stream' hasTabBar>
            <div className='py-10 divide-y-2 space-y-4'>
                {streams.map((stream) => ( 
                    <StreamItem
                        key={stream.id}
                        Name={stream.name}
                        id={stream.id}
                    />
                ))}
                <Link href="/stream/create">
                    <a>
                        <AddBtn
                            IconD='M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z' />
                    </a>
                </Link>
            </div>
        </Layout>
    )
}

export default Stream