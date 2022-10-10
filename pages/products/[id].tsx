import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import SilmilarItem from '@components/Items/SimilarItem';
import Layout from '@components/Common/Layout';
import ProfileBox from '@components/Common/ProfileBox';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Link from 'next/link';
import SubmitBtn from '@components/Form/SubmitBtn';
import { ChatRoom, Product, Review, User } from '@prisma/client';
import useMutation from '@libs/client/useMutation';
import { cls, ImageURL } from '@libs/client/utils';
import useUser from '@libs/client/useUser';
import {motion} from 'framer-motion';
import NotFound from '@components/Common/NotFound';
import { useEffect } from 'react';
import Image from 'next/image';
import client from '@libs/server/client';

interface ProductWithUser extends Product {
    user: User;
    review: Review
}

interface ItemDetailResponse {
    ok: boolean;
    product: ProductWithUser;
    relatedProducts: Product[];
    isLiked: boolean;
    error?: string;
}

interface ChatRoomResponse {
    ok: boolean;
    error?: string;
    chatRoom : ChatRoom
}

const ItemDetail: NextPage<ItemDetailResponse> = ({product, relatedProducts}) => { 

    const router = useRouter();
    const { user } = useUser();

    // 상품 관련
    const { data, mutate:boundMutate } = useSWR<ItemDetailResponse>
        (router.query.id ? `/api/products/${router.query.id}` : null);
    
    
    // 채팅 관련
    const [createChatRoom, { data: chatData, loading: chatLoading, error: chatError }]
        = useMutation<ChatRoomResponse>(`/api/chat`);
    
    const onClickChatRoom = () => {
        if (chatLoading) return;
        if (product.userId === user?.id) {
            return alert("자신의 물건은 구입할 수 없습니다.");
        }
        createChatRoom({ sellerId: product.userId, productId: product.userId });

        if (chatData?.error) {
            alert("이미 거래중 입니다.");    
            return router.push(`/chats/${chatData.chatRoom.id}`);
        };
    }

    useEffect(() => {
        if (chatData && !chatLoading) {
            router.push(`/chats/${chatData.chatRoom.id}`);
        }
    }, [chatData, router, chatLoading]);


    // 좋아요 관련
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
        <Layout canGoBack seoTitle='Product Detail | Carrot Market'>
            {product ? (
            <>
                {product?.review ? (
                <div className="flex absolute w-full h-full bg-black z-50 opacity-70">
                    <span className="relative font-bold text-white flex justify-center items-center m-auto text-2xl z-50">
                    거래가 종료된 상품입니다.
                    </span>
                </div>
                ) : null}
                <div className="px-4 py-10 ">
                <div className="">
                    <div className="relative pb-96 mb-6">
                    <Image
                        src={ImageURL(product?.image!, "public")}
                        className="h-96 bg-slate-300 mb-4 m-auto object-scale-down rounded-md"
                        layout="fill"
                        alt={product?.name}
                    />
                    </div>
                    <ProfileBox
                    Name={product?.user.name!}
                    isMine={false}
                    id={product?.userId!}
                    imageId={product.user.avator!}
                    />
                    <div className="mt-10">
                        <h1 className="text-3xl font-bold text-gray-800">
                            {product?.name}
                        </h1>
                        <span className="text-3xl mt-3 block">
                            ${product?.price}
                        </span>
                        <p className="text-base my-6 text-gray-700">
                            {product?.description}
                        </p>
                    <div className="flex items-center justify-between space-x-2">
                        <SubmitBtn
                        onClick={onClickChatRoom}
                        Content="Talk to seller"
                        />
                        <motion.button
                        whileTap={{ scale: 1.5 }}
                        onClick={onFavClick}
                        className={cls(
                            "p-3 mt-6 flex items-center justify-center rounded-md",
                            data?.isLiked
                            ? "text-red-400 hover:text-red-500 hover:bg-gray-100"
                            : "text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                        )}
                        >
                        {!data?.isLiked ? (
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
                        ) : (
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            >
                            <path
                                fill-rule="evenodd"
                                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                clip-rule="evenodd"
                                strokeWidth="2"
                            />
                            </svg>
                        )}
                        </motion.button>
                    </div>
                    </div>
                    <div className="mt-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Similar items
                    </h2>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                        {relatedProducts?.map((item) => (
                            <Link key={item.id} href={`/products/${item.id}`}>
                                <a>
                                <SilmilarItem
                                    Name={item.name}
                                    Price={item.price}
                                />
                                </a>
                            </Link>
                        ))}
                    </div>
                    </div>
                </div>
                </div>
            </>
            ) : (
                <NotFound Content="상품 정보를 찾을 수 없습니다." />
            )}
        </Layout>
    );
}

export const getStaticPaths: GetStaticPaths = () => {
    return {
        paths: [],
        fallback: "blocking"
    }
}

export const getStaticProps: GetStaticProps = async (ctx) => {

    if (!ctx?.params?.id) {
        return {
            props: {}
        }
    };

    if (Number.isNaN(+ctx.params.id)) {
        return {
            props: {}
        }
    }

    const product = await client.product.findUnique({
        where: {
            id: Number(ctx.params.id),
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    avator: true
                }
            },
            review: true
        }
    })

    const terms = product?.name.split(" ").map(word => ({
        name: {
            contains: word
        }
    }));

    const relatedProducts = await client.product.findMany({
        where: {
            OR: terms,
            AND: {
                id: {
                    not: product?.id
                }
            }
        }
    });

    return {
        props: {
            product: JSON.parse(JSON.stringify(product)),
            relatedProducts: JSON.parse(JSON.stringify(relatedProducts)),
        }
    }
}

export default ItemDetail;