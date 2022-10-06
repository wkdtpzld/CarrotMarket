import type { NextPage } from 'next'
import AddBtn from '@components/Icon/AddBtn';
import Item from '@components/Items/Item';
import Layout from '@components/Common/Layout';
import useSWRInfinite from 'swr/infinite';
import Head from 'next/head';
import Link from 'next/link';
import { Product } from '@prisma/client';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import { useInfiniteScroll } from '../libs/client/useInfiniteScroll';
import { useEffect } from 'react';

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
  if (pageIndex === 0) return `/api/products?page=1`;
  if (pageIndex + 1 > previousPageData.pages) return null;
  return `/api/products?page=${pageIndex + 1}`;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Home: NextPage = () => {

  const { data, setSize } = useSWRInfinite<ProductsResponse>(getKey, fetcher);

  const products = data ? data.map(item => item.products).flat() : [];

  const page = useInfiniteScroll();
  useEffect(() => {
    setSize(page);
  }, [setSize, page])

  return (
    <Layout title='홈' hasTabBar seoTitle='Products | Carrot Market'>
      <div className='flex px-4 flex-col divide-y-2'>
        {
          data ? (
            <>
              {products.map((product) => (
                <Item
                  key={product.id}
                  image={product.image}
                  id={product.id}
                  Name={product.name}
                  Category={product.price + ""}
                  Price={product.price}
                  Like={product._count.records}
                  ChatCount={product._count.chatRoom} />
              ))}
            </>
          ) : (
              <>
                {[1, 1, 1, 1, 1, 1].map((_, i) => (
                  <div className='flex py-4 justify-between' key={i}>
                    <div className='flex space-x-4'>
                      <Skeleton width={80} height={80} />
                      <div className='pt-2 flex flex-col'>
                        <Skeleton width={100} />
                        <Skeleton width={80} height={10} />
                        <Skeleton width={100} height={23} />
                      </div>
                    </div>
                    <div className='flex items-end justify-end space-x-1.5'>
                      <Skeleton width={30} />
                      <Skeleton width={30} />
                    </div>
                  </div>
                ))}
              </>
          )
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

export default Home;