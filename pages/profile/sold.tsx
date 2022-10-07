import type { NextPage, NextPageContext } from 'next'
import ProductListItems, { ProductListResponse } from '@components/Items/ProductListItems';
import Layout from '@components/Common/Layout';
import { withSsrSession } from '@libs/server/withSession';
import client from '@libs/server/client';
import { SWRConfig } from 'swr';
import { Kind, Record } from '@prisma/client';
import useSWRInfinite, {unstable_serialize} from 'swr/infinite';
import { useInfiniteScroll } from '@libs/client/useInfiniteScroll';
import { useEffect } from 'react';

const getKey = (pageIndex: number, previousPageData: ProductListResponse) => {
    if (previousPageData && !previousPageData.records.length) return null;
    return `/api/users/me/records?kind=${Kind.Sale}&page=${pageIndex + 1}`;
};


const Sold: NextPage = () => { 
    
    const { data, setSize } = useSWRInfinite<ProductListResponse>(getKey);

    const page = useInfiniteScroll();

    useEffect(() => {
        setSize(page)
    }, [setSize, page]);

    return (
        <Layout canGoBack>
            <ProductListItems data={data!} />
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
                ]}
            }}
        >
            <Sold />
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
            kind: Kind.Sale
        }
    });
    const records = await client.record.findMany({
        where: {
            userId: req?.session.user?.id,
            kind: Kind.Sale
        },
        include: {
            product: {
                include: {
                    _count: {
                        select: {
                            records: {
                                where: {
                                    kind: Kind.Sale
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
            pages: Math.ceil(recordsCount - 1) * 10
        }
    }

})