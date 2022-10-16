import type { GetServerSideProps, NextPage, NextPageContext } from 'next'
import InputSubmitBtn from '@components/Form/InputSubmitBtn';
import Layout from '@components/Common/Layout';
import ChattingBubble from '@components/Items/ChattingBubble';
import useSWR, { SWRConfig } from 'swr';
import { useRouter } from 'next/router';
import { ChatRoom, Message, Product, Reservation, User } from '@prisma/client';
import useUser from '@libs/client/useUser';
import { useForm } from 'react-hook-form';
import useMutation from '@libs/client/useMutation';
import Image from 'next/image';
import { dateFormat, ImageURL } from '@libs/client/utils';
import React, { useState, useEffect, useRef } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Link from 'next/link';
import client from '@libs/server/client';

interface MessageWithUser extends Message {
    user: User
}

interface ProductWithReservation extends Product {
    reservation: Reservation
}

interface ChatRoomWithMessage extends ChatRoom {
    message: MessageWithUser[];
    product: ProductWithReservation;
}

interface ChatMessageResponse {
    ok: boolean,
    messages: ChatRoomWithMessage,
    isDone: boolean
}

interface MessageForm {
    message: string
}

interface ReservationResponse {
    ok: boolean,
    reservation: Reservation
}

const ChatDetail: NextPage = () => {
    
    // State, Router, user
    const scrollRef = useRef<any>(); 
    const router = useRouter();
    const [date, setDate] = useState(new Date());
    const { user } = useUser();
    const today = new Date();

    // GetPage useSWR And Auth
    const { data, mutate } = useSWR<ChatMessageResponse>
        (router.query.id ? `/api/chat/${router.query.id}` : null, {
            refreshInterval: 1000
        });
    
    if (!data?.ok && data) {
        router.push(`/`)
    }

    // Reservation 관련
    const [reservation, { data: reservationData, loading: reservationLoading }]
        = useMutation<ReservationResponse>(`/api/chat/${router.query.id}/reservation`, "POST");
    
    const onClickCreateReservation = () => {
        if (reservationLoading) return;

        const timeValue = new Date(date);
        
        const betweenTime = Math.floor((timeValue.getTime() - today.getTime()) / 1000 / 60);

        if (betweenTime < 0) {
            return alert('오늘 이후의 날짜를 입력해주세요');
        };
        reservation({ date, productId: data?.messages.productId });
        mutate();
    }

    const onClickDeleteReservation = () => {
        if (reservationLoading) return;
        reservation({ date, productId: data?.messages.productId });
        mutate();
    };

    useEffect(() => {
        if (reservationData && !reservationData.ok) {
            alert("이미 예약내역이 존재합니다.");
        }
    }, [reservationData]);

    // Message 관련
    const [createMessage, {data:MessageData, loading}] = useMutation(`/api/chat/${router.query.id}/message`, "POST");

    const { register, handleSubmit, reset } = useForm<MessageForm>();
    const onValid = (form: MessageForm) => {
        if (loading) return;
        mutate(
            (prev) =>
                prev && {
                ...prev,
                messages: {
                    ...prev.messages,
                    message: [
                    ...prev.messages.message,
                    { id: Date.now(), message: form.message, user: { ...user } },
                    ],
                },
            } as any, false);
        createMessage(form);
        reset();
        scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    };

    return (
        <Layout canGoBack>
            {data?.messages && data?.ok && !data.isDone ?
                (
                <>
                <div className='h-20 flex border-b items-center justify-between fixed bg-white w-full z-50 -mt-4'>
                    <div className='space-x-4 ml-4 flex '>
                        <Image
                            src={ImageURL(data.messages.product?.image, "avatar")}
                            className='w-10 h-10 bg-slate-300 rounded-full -z-10'
                            width={40}
                            height={40}
                            alt={String(data.messages.productId)}
                        />
                        <div className='text-sm flex flex-col'>
                            <span className='text-gray-700'>{data.messages.product?.name}</span>
                            <span className='text-xl font-semibold'>$ {data.messages.product?.price}</span>
                        </div>
                    </div>
                    {data.messages.product?.userId === user?.id ? (
                        <div className='flex z-20'> 
                            <DatePicker selected={date} onChange={(date:Date) => setDate(date)} className="w-28 h-12 rounded-md"/>
                            <button
                                onClick={!data.messages.product?.reservation ? onClickCreateReservation : onClickDeleteReservation}
                                className='w-36 h-12 bg-orange-300 mr-4 rounded-md hover:bg-orange-500 transition'>
                                <span className='text-gray-800 text-sm font-semibold'>
                                    {data.messages.product?.reservation ? "예약 취소" : "예약하기"}
                                </span>
                            </button>
                        </div>
                    ) : (
                        null
                    )}
                </div>
                <div className='px-4 py-10 space-y-4 my-14'>
                    {data?.messages.message?.map(message => (
                        <ChattingBubble
                            key={message.id}
                            Message={message.message}
                            type={user?.id === message.user.id ? "inside" : "opposite"}
                            imageId={message?.user?.loginType === "default" 
                              ? ImageURL(message?.user?.avator!, "avatar")
                              : message?.user?.avator!}
                        />
                    ))}
                    {data.messages.product?.reservation ? (
                        <>
                        {new Date(data?.messages.product?.reservation.reservationDate!) > new Date()
                            ? (
                            <div className='flex items-center justify-center mt-6 relative'>
                                <span className='text-sm font-semibold'>
                                    {dateFormat(data.messages.product?.reservation.reservationDate)}
                                </span>
                                <span className='text-sm'>
                                    일 거래 예약날입니다.
                                </span>
                            </div>
                            ) : (
                            <>
                                {data.messages.buyerId === user?.id 
                                ? (
                                    <div className='flex flex-col items-center justify-center mt-6'>
                                        <span className='text-center text-sm mb-2'>거래는 마음에 드셨나요?</span>
                                        <Link href={`/chats/${router.query.id}/review`}>
                                            <a>
                                                <span className='font-semibold'> 리뷰 쓰러가기</span>
                                            </a>
                                        </Link>
                                    </div>
                                ) : (
                                    null
                                )}
                            </>
                        )}
                        </>
                    ) : (
                        null
                    )}
                </div>
                <div ref={scrollRef}/>
                <InputSubmitBtn
                    register={register("message", {
                        required: true
                    })}
                    onSubmit={handleSubmit(onValid)}
                />
                </>
                ) : (
                    <div className='flex justify-center items-center relative top-52'>
                        <span className='text-xl font-semibold'>거래가 끝난 상품 또는 찾을 수 없는 상품입니다.</span>
                    </div>
                )}
        </Layout>
    )
}

export default ChatDetail;