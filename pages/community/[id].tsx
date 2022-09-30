import type { NextPage } from 'next'
import CommentItem from '@components/Items/CommentItem';
import Layout from '@components/Common/Layout';
import ProfileBox from '@components/Common/ProfileBox';
import SubmitBtn from '@components/Form/SubmitBtn';
import TextArea from '@components/Form/TextArea';
import CommunityItemIcon from '@components/Icon/CommunityItemIcon';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Answer, Post, User } from '@prisma/client';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import useMutation from '../../libs/client/useMutation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

interface AnswerWithUser extends Answer{
    user: User;
}

interface PostWithUser extends Post {
    user: User;
    _count: {
        answers: number;
        wondering: number;
    },
    answers: AnswerWithUser[];
}

interface CommunityPostResponse {
    ok: boolean;
    post: PostWithUser;
    isWondering: boolean;
    onClick?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
}

interface AnswerForm {
    answer: string;
}

interface AnswerResponse {
    ok: boolean;
}

const CommunityDetail: NextPage = () => {

    const router = useRouter();
    const { register, handleSubmit, reset, formState: { errors } } = useForm<AnswerForm>();
    const { data, mutate } =
        useSWR<CommunityPostResponse>(router.query.id ? `/api/posts/${router.query.id}` : null);
    
    const [wonder, { loading }]
        = useMutation(`/api/posts/${router.query.id}/wonder`);
    const [sendAnswer, { data: answerData, loading: answerLoading }]
        = useMutation<AnswerResponse>(`/api/posts/${router.query.id}/answers`);

    const onWonderClick = () => {
        if (!data) return;
        mutate({
            ...data,
            post: {
                ...data.post, _count: {
                    ...data.post._count,
                    wondering: data.isWondering ? data?.post._count.wondering - 1 : data.post._count.wondering + 1
                }
            },
            isWondering: !data.isWondering
        }, false);
        if (!loading) {
            wonder({});
        }
    }
    
    const onValid = (form:AnswerForm) => {
        if (answerLoading) return;
        sendAnswer(form);
    }
    
    useEffect(() => {
        if (answerData && answerData.ok) {
            reset();
            mutate();
        }
    }, [answerData, reset, mutate]);
    

    return (
        <Layout canGoBack>
            <div className=''>
                <span className='inline-flex my-3 ml-4 items-center px-4 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800'
                    >동네질문</span>
                <div className='flex mb-5 py-3 border-t border-b items-center space-x-3 px-4'>
                    <ProfileBox
                        Name={data?.post?.user?.name!}
                        isMine={false}
                        id={data?.post?.userId!}
                    />
                </div>
                <div className='px-4 pb-2'>
                    {data ? (
                        <>
                        <div className='mt-2 text-gray-700'>
                            <span className='text-orange-500 font-medium mr-2'>Q.</span> {data?.post?.question}
                        </div>
                        </>
                    ) : (
                        <>
                        <div className='mt-2'>
                            <span className='text-orange-500 font-medium mr-2'>Q.</span>
                            <Skeleton width={350} />
                        </div>
                        </>    
                    )}
                </div>
                <CommunityItemIcon
                    Answer={data?.post?._count?.answers!}
                    Attention={data?.post?._count?.wondering!}
                    isWondering={data?.isWondering}
                    onClick={onWonderClick}
                />
                {data
                    ? (
                    <>
                        {data?.post.answers.map((answer) => (
                            <CommentItem
                                key={answer.id}
                                Name={answer.user.name}
                                Date={answer.createdAt.toString()}
                                Comment={answer.answer}
                            />   
                        ))}
                    </>
                    ) : (
                    <>
                        {[1, 1, 1, 1].map((_, i) => (
                        <div className='px-4 flex items-start space-x-3 my-5' key={i}>
                            <Skeleton width={32} height={32} circle className='py-4'/>
                            <div className='space-y-2'>
                                <Skeleton width={100} height={10} />
                                <Skeleton width={150} height={8} className="pt-1" />
                                <Skeleton width={300} height={15} />
                            </div>
                        </div>
                        ))}
                    </>
                    )
                }
                
                    
                <form className='px-4' onSubmit={handleSubmit(onValid)}>
                    <TextArea
                        Placeholder='Answer this question'
                        register={register("answer", {
                            required: {
                                value: true,
                                message: "답장은 3글자 이상으로 적어주세요."
                            },
                            minLength: {
                                value: 3,
                                message: "답장은 3글자 이상으로 적어주세요."
                            }
                        })}
                        required
                        error={errors.answer}
                    />
                    <SubmitBtn
                        Content={!answerLoading ? "Reply" : "Loading"}
                    />
                </form>
            </div>
        </Layout>
        
    )
}

export default CommunityDetail;