import type { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from 'next'
import CommentItem from '@components/Items/CommentItem';
import Layout from '@components/Common/Layout';
import ProfileBox from '@components/Common/ProfileBox';
import SubmitBtn from '@components/Form/SubmitBtn';
import TextArea from '@components/Form/TextArea';
import CommunityItemIcon from '@components/Icon/CommunityItemIcon';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Answer, Post, User } from '@prisma/client';

import useMutation from '../../libs/client/useMutation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import NotFound from '@components/Common/NotFound';
import client from '@libs/server/client';
import { SWRConfig, unstable_serialize } from 'swr';
import TransformDate from '../../libs/client/TransformDate';
import useUser from '@libs/client/useUser';

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
    id?: number
    onClick?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
}

interface AnswerForm {
    answer: string;
}

interface AnswerResponse {
    ok: boolean;
}

interface DeleteResponse {
    ok: boolean
}

const CommunityDetail: NextPage = () => {

    const [isOk, setIsOk] = useState();
    const router = useRouter();
    const { user } = useUser();
    const { register, handleSubmit, reset, formState: { errors } } = useForm<AnswerForm>();
    const { data, mutate } =
        useSWR<CommunityPostResponse>(router.query.id ? `/api/posts/${router.query.id}` : null);
    
    const [wonder, { loading }]
        = useMutation(`/api/posts/${router.query.id}/wonder`, "POST");

    const [sendAnswer, { data: answerData, loading: answerLoading }]
        = useMutation<AnswerResponse>(`/api/posts/${router.query.id}/answers`, "POST");

    const [deletePost, { data: deleteData, loading: deleteLoading }]
        = useMutation<DeleteResponse>(`/api/posts/${router.query.id}`, "DELETE");
    
    const onDeleteClick = () => {
        
        if (deleteLoading) return;
        if (confirm("정말로 삭제하시겠습니까?")) {
            deletePost({});
        }
    }
    
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
    
    useEffect(() => {
        if (deleteData && deleteData.ok) {
            router.push(`/community`)
        }
    }, [router, deleteData]);

    return (
        <Layout canGoBack>
            {data?.post ? (
            <div className='relative'>
                <span className='inline-flex my-3 ml-4 items-center px-4 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800'
                    >동내질문</span>
                    {user?.id === data.post.userId
                        ? (
                        <button 
                            onClick={onDeleteClick}
                            className='absolute w-20 h-5 rounded-md bg-orange-400 text-sm text-white
                            text-center flex items-center justify-center right-4 -top-0 my-3 hover:bg-orange-500
                            focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none px-2'>
                            질문 삭제
                        </button>
                        ): null}
                
                <div className='flex mb-5 py-3 border-t border-b items-center space-x-3 px-4 relative'>
                    <ProfileBox
                        Name={data?.post?.user?.name!}
                        isMine={false}
                        id={data?.post?.userId!}
                        imageId={data?.post.user.avator!}
                    />
                </div>
                <div className='px-4 pb-2 relative'>
                    <div className='mt-2 text-gray-700'>
                        <span className='text-orange-500 font-medium mr-2'>Q.</span> {data?.post?.question}
                    </div>
                </div>
                <CommunityItemIcon
                    Answer={data?.post?._count?.answers!}
                    Attention={data?.post?._count?.wondering!}
                    isWondering={data?.isWondering}
                    onClick={onWonderClick}
                />
                {data?.post.answers.map((answer) => (
                    <CommentItem
                        key={answer.id}
                        Name={answer.user.name}
                        Date={TransformDate(answer.createdAt)}
                        Comment={answer.answer}
                        imageId={answer.user.avator!}
                    />   
                ))}
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
            ) : (
                <NotFound Content='해당 질문을 찾을 수 없습니다.'/>
            )}
        </Layout>
        
    )
}

const Page: NextPage<CommunityPostResponse> = ({ id, post, isWondering }) => {
	return (
		<SWRConfig
			value={{
				fallback: {
					[unstable_serialize(`/api/posts/${id}`)]: {
						ok: true,
						post,
						isWondering,
					},
				},
			}}
		>
			<CommunityDetail />
		</SWRConfig>
	);
};

export default Page;

export const getStaticPaths: GetStaticPaths = () => {

    return {
        paths: [],
        fallback: "blocking"
    }
}

export const getStaticProps: GetStaticProps = async (ctx:GetStaticPropsContext) => {

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

    const id = ctx.params.id;

    const post = await client.post.findUnique({
        where: {
            id: Number(ctx?.params?.id)
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    avator: true
                }
            },
            answers: {
                select: {
                    answer: true,
                    id: true,
                    createdAt: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                            avator: true
                        }
                    }
                }
            },
            _count: {
                select: {
                    answers: true,
                    wondering: true
                }
            }
        },
    });

    const isWondering = Boolean(await client.wondering.findFirst({
        where: {
            postId: Number(ctx?.params?.id),
            userId: post?.id
        },
        select: {
            id: true
        }
    }))

    return {
        props: {
            post: JSON.parse(JSON.stringify(post)),
            isWondering,
            id
        }
    }
}