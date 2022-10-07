import type { NextPage } from 'next'
import AddBtn from '@components/Icon/AddBtn';
import Item from '@components/Items/Item';
import Layout from '@components/Common/Layout';
import useSWRInfinite, { unstable_serialize } from 'swr/infinite';
import Link from 'next/link';
import { Product } from '@prisma/client';
import 'react-loading-skeleton/dist/skeleton.css'
import { useInfiniteScroll } from '../libs/client/useInfiniteScroll';
import { useEffect } from 'react';
import { SWRConfig } from 'swr';
import { GetStaticProps } from 'next';
import client from '@libs/server/client';

interface ProductsWithHeart extends Product {
  _count: {
    records: number;
    chatRoom: number;
  }
}

interface ProductsResponse {
  ok: boolean;
  products: ProductsWithHeart[];
  pages: number;
}

const getKey = (pageIndex: number, previousPageData: ProductsResponse) => {
  if (previousPageData && !previousPageData.products.length) return null;
  return `/api/products?page=${pageIndex + 1}`;
};

const Home: NextPage = () => {

  const { data, setSize } = useSWRInfinite<ProductsResponse>(getKey);

  const page = useInfiniteScroll();

  useEffect(() => {
    setSize(page);
  }, [setSize, page])

  return (
    <Layout title='홈' hasTabBar seoTitle='Products | Carrot Market'>
      <div className='flex px-4 flex-col divide-y-2'>
        {data
          ? data?.map((item) => {
            return item.products.map((product) => (
              <Item
                key={product.id}
                image={product.image}
                id={product.id}
                Name={product.name}
                Category={product.price + ""}
                Price={product.price}
                Like={product._count.records}
                ChatCount={product._count.chatRoom} />
            ))
          }) : null
        }
        
        <Link href="/products/upload">
          <a>
            <AddBtn IconD='M12 6v6m0 0v6m0-6h6m-6 0H6' />
          </a>
        </Link>
      </div>
    </Layout>
  )
}

const Page: NextPage<ProductsResponse> = ({ products, pages}) => {

  return (
    <SWRConfig
      value={{
        fallback: {
          [unstable_serialize(getKey)]: [
            {
              ok: true,
              products,
              pages
            }
          ]
        }
      }}
    >
      <Home />
    </SWRConfig>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {

  const productCount = await client.product.count();
  const products = await client.product.findMany({
    include: {
      _count: {
        select: {
            records: {
                where: {
                    kind: 'Fav'
                }
            },
            chatRoom: true
        },
      }
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: 10,
    skip: 0
  });

  if (!products) return {
    props: {}
  }

  return {
    props: {
      ok: true,
      products: JSON.parse(JSON.stringify(products)),
      pages: Math.ceil(productCount / 10)
    }
  }

}

export default Page;