import type { NextPage } from 'next'
import AddBtn from '@components/Icon/AddBtn';
import Item from '@components/Items/Item';
import Layout from '@components/Common/Layout';
import useUser from '../libs/client/useUser';
import Head from 'next/head';
import Link from 'next/link';
import useSWR from 'swr';
import { Product } from '@prisma/client';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

interface ProductsWithHeart extends Product {
  _count: {
    records: number;
  }
}

interface ProductsResponse {
  ok: boolean;
  products: ProductsWithHeart[];
}

const Home: NextPage = () => {

  const { data } = useSWR<ProductsResponse>("/api/products");

  return (
    <Layout title='홈' hasTabBar>
      <Head>
        <title>Home</title>
      </Head>
      <div className='flex px-4 flex-col divide-y-2'>
        {
          data ? (
            <>
              {data?.products?.map((product) => (
                <Item
                  key={product.id}
                  id={product.id}
                  Name={product.name}
                  Category={product.price + ""}
                  Price={product.price}
                  Like={product._count.records}
                  ChatCount={2} />
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