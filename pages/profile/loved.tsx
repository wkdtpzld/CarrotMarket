import type { NextPage, NextPageContext } from 'next'
import Layout from '@components/Common/Layout';
import ProductListItems, { ProductListResponse } from '@components/Items/ProductListItems';
import client from '@libs/server/client';
import { withSsrSession } from '@libs/server/withSession';
import { SWRConfig } from 'swr';
import { Kind, Record } from '@prisma/client';
import useSWRInfinite, { unstable_serialize } from 'swr/infinite';
import { useInfiniteScroll } from '@libs/client/useInfiniteScroll';
import {useEffect} from 'react';

const getKey = (pageIndex: number, previousPageData: ProductListResponse) => {
    if (previousPageData && !previousPageData.records.length) return null;
    return `/api/users/me/records?kind=${Kind.Fav}&page=${pageIndex + 1}`;
};

const Loved: NextPage = () => { 

    const { data, setSize } = useSWRInfinite<ProductListResponse>(getKey);

    const page = useInfiniteScroll();

    useEffect(() => {
        setSize(page);
    }, [setSize, page])

    return (
        <Layout canGoBack>
            {data ? (
                <ProductListItems data={data} />
            ) : null}
        </Layout>
    )
}

const Page: NextPage<{ok: boolean, records: Record[], pages: number}> = ({ok, records, pages}) => {
    return (
        <SWRConfig
            value={{
                fallback: {
                    [unstable_serialize(getKey)]: [
                        {
                            ok,
                            records,
                            pages
                        }   
                    ]
                }
            }}
        >
            <Loved />
        </SWRConfig>
    )
}

export default Page;

export const getServerSideProps = withSsrSession(async function (
    {req} : NextPageContext
) {
    const recordsCount = await client.record.count({
        where: {
            userId: req?.session.user?.id,
            kind: Kind.Fav
        }
    });
    const records = await client.record.findMany({
        where: {
            userId: req?.session.user?.id,
            kind: Kind.Fav
        },
        include: {
            product: {
                include: {
                    _count: {
                        select: {
                            records: {
                                where: {
                                    kind: Kind.Fav
                                }
                            },
                            chatRoom: true
                        }
                    }
                }
            },
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: 10,
        skip: 0
    });

    return {
        props: {
            ok: true,
            records: JSON.parse(JSON.stringify(records)),
            pages: Math.ceil(recordsCount / 10)
        }
    }

})