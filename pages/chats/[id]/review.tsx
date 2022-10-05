import TextArea from "@components/Form/TextArea";
import { NextPage } from "next"
import { useRouter } from 'next/router';
import Layout from '@components/Common/Layout';
import { useForm } from 'react-hook-form';
import SubmitBtn from "@components/Form/SubmitBtn";
import useSWR from 'swr';
import Image from "next/image";
import { ImageURL } from "@libs/client/utils";
import { ChatRoom, Message, Product, Reservation, User } from "@prisma/client";
import useUser from '@libs/client/useUser';
import ReactStars from 'react-stars';
import { useState } from 'react';
import {useEffect} from 'react';
import useMutation from '../../../libs/client/useMutation';

interface ReviewForm {
    reviewMessage: string;
    star: number;
}

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
    messages: ChatRoomWithMessage
}


const Stream: NextPage = () => { 

    const router = useRouter();

    const [star, setStar] = useState(1);
    const [createReview, { data:reviewData, loading:reviewLoading }] = useMutation(`/api/reviews`);
    const { register, handleSubmit, reset, setValue } = useForm<ReviewForm>();
    const onValid = ({star, reviewMessage }: ReviewForm) => {
        if (reviewLoading) return;

        createReview({ star, reviewMessage, sellerId:data?.messages.sellerId, buyerId:data?.messages.buyerId, productId: data?.messages.productId });
        router.push(`/profile`)
        reset();
    }

    const onChange = (value: number) => {
        setStar(Math.ceil(star))
        return setValue("star", Math.ceil(value));
    }

    const { user } = useUser();
    const { data } = useSWR<ChatMessageResponse>(router.query.id ? `/api/chat/${router.query.id}` : null);
    
    if (data && data.ok) {
        if (user?.id !== data?.messages.buyerId) {
            router.push(`/chats`)
        }
    }

    return (
        <Layout canGoBack>
            <div className="mt-10 mx-4">
                <span className="flex items-center justify-center text-sm text-gray-900 font-semibold">
                    해당 거래가 어떠셨나요? 리뷰를 남겨주세요.
                </span>
                <div className="relative pb-96 my-6">
                    <Image
                        src={ImageURL(data?.messages.product.image!, "public")}
                        className="h-96 bg-slate-300 mb-4 m-auto object-scale-down rounded-md"
                        alt={data?.messages.product.name}
                        layout="fill"
                    />
                </div>
                <span className="flex justify-center text-2xl font-semibold">{data?.messages.product.name}</span>
                
                <form className="mt-4" onSubmit={handleSubmit(onValid)}>
                    
                    <input
                        type="number"
                        className="hidden"
                        {...register("star", {
                            max: 5,
                            min: 0
                    })} />
                    <ReactStars
                        count={5}
                        size={24}
                        value={star}
                        onChange={(value) => onChange(value)}
                        color2={'#ffd700'}
                    />
                    <TextArea
                        Placeholder="Please Input your Review"
                        Name="Review"
                        register={register("reviewMessage", {
                            required: {
                                value: true,
                                message: "10글자 이상으로 입력해 주세요."
                            }
                        })}
                    />
                    <SubmitBtn
                        Content="Submit"
                    />
                </form>
            </div>
        </Layout>
    )
}

export default Stream;