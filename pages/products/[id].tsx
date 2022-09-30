import type { NextPage } from 'next'
import SilmilarItem from '@components/Items/SimilarItem';
import Layout from '@components/Common/Layout';
import ProfileBox from '@components/Common/ProfileBox';
import { useRouter } from 'next/router';
import useSWR, { useSWRConfig } from 'swr';
import Link from 'next/link';
import SubmitBtn from '@components/Form/SubmitBtn';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import { Product, User } from '@prisma/client';
import useMutation from '../../libs/client/useMutation';
import { cls } from '../../libs/client/utils';
import useUser from '../../libs/client/useUser';
import {motion} from 'framer-motion';

interface ProductWithUser extends Product {
    user: User;
}

interface ItemDetailResponse {
    ok: boolean;
    product: ProductWithUser;
    relatedProducts: Product[];
    isLiked: boolean;
}

const heartVariants = {
    normal: {
        scale: 0.3,
        transition: {
            type: "spring"
        }
    },
    click: {
        scale: 1,
        transition: {
            type: "spring"
        }
    },
    exit: {
        scale: 0.3
    }

}

const ItemDetail: NextPage = () => { 

    const router = useRouter();
    const { user, isLoading } = useUser();

    const { data, mutate:boundMutate } = useSWR<ItemDetailResponse>
        (router.query.id ? `/api/products/${router.query.id}` : null);
    
    const [toggleFav] = useMutation(`/api/products/${router.query.id}/fav`);
    const onFavClick = () => {
        toggleFav({})
        if (!data) return;
        boundMutate({
            ...data,
            isLiked: !data.isLiked
        }, false);
    }
    
    return (
        <Layout canGoBack>
            <div className='px-4 py-10'>
                <div className='mb-6'>
                    <div className='h-96 bg-slate-300 mb-4' />
                    <ProfileBox
                        Name={data?.product.user.name!}
                        isMine={false}
                        id={data?.product.userId!}
                    />
                    <div className='mt-10'>
                        {!data ? (
                            <>
                                <Skeleton height={36} />
                                <Skeleton className='mt-3 mb-5' height={30} />
                                <Skeleton className='' count={2}/>
                            </>
                        )  :
                            <>
                                <h1 className='text-3xl font-bold text-gray-800'>{data?.product.name}</h1>
                                <span className='text-3xl mt-3 block'>${data?.product.price}</span>
                                <p className='text-base my-6 text-gray-700'>
                                    {data?.product.description}
                                </p>
                            </>
                        }
                        <div className='flex items-center justify-between space-x-2'>
                            <SubmitBtn Content="Talk to seller" />
                            <motion.button
                                whileTap={{scale:0.2}}
                                onClick={onFavClick}
                                className={cls(
                                    "p-3 mt-6 flex items-center justify-center rounded-md",
                                    data?.isLiked
                                        ? "text-red-400 hover:text-red-500 hover:bg-gray-100"
                                        : "text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                                )}>
                                {!data?.isLiked ?
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
                                    </svg> : 
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path
                                            fill-rule="evenodd"
                                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                            clip-rule="evenodd"
                                            strokeWidth="2"/>
                                    </svg>
                                }
                            </motion.button>
                        </div>
                    </div>
                    </div>
                    <div className=''>
                    <h2 className='text-2xl font-bold text-gray-800'>Similar items</h2>
                    <div className='grid grid-cols-2 gap-4 mt-6'>
                        {data
                            ? (
                                data.relatedProducts.map((item) => (
                                    <Link key={item.id} href={`/products/${item.id}`}>
                                        <a>
                                            <SilmilarItem
                                                Name={item.name}
                                                Price={item.price}
                                            />
                                        </a>
                                    </Link>
                                ))
                            )
                            : (
                                [1, 1, 1, 1].map((_, i) => (
                                    <div key={i}>
                                        <Skeleton height={224} className="mb-4"/>
                                        <Skeleton className='-mb-1' />
                                        <Skeleton height={10}/>
                                    </div>
                                ))
                                
                                
                            )
                            }
                        
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ItemDetail;