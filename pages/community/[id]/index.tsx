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

import useMutation from '@libs/client/useMutation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import NotFound from '@components/Common/NotFound';
import client from '@libs/server/client';
import { SWRConfig, unstable_serialize } from 'swr';

import TransformDate from '@libs/client/TransformDate';
import useUser from '@libs/client/useUser';
import Link from 'next/link';
import { ImageURL } from '@libs/client/utils';

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
                <div className='flex mb-5 py-3 border-t border-b items-center space-x-3 px-4 relative'>
                    <ProfileBox
                        Name={data?.post?.user?.name!}
                        isMine={false}
                        id={data?.post?.userId!}
                        imageId={data?.post?.user?.loginType === "default" 
                          ? ImageURL(data?.post?.user.avator!, "avatar")
                          : user?.avator!}
                    />
                    {user?.id === data.post.userId
                        ? (
                        <>
                        <button 
                            onClick={onDeleteClick}
                            className='absolute w-10 h-10 rounded-md bg-orange-400 text-sm text-white
                            text-center flex items-center justify-center right-4 my-3 hover:bg-orange-500
                            focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none px-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </button>
                        <Link href={`/community/${router.query.id}/edit`}>
                            <a>
                                <div className='absolute w-10 h-10 rounded-md bg-orange-400 text-sm text-white
                                    text-center flex items-center justify-center right-16 top-1 my-3 hover:bg-orange-500
                                    focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none px-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                    </svg>
                                </div>
                            </a>
                        </Link>
                        </>
                    ): null}
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
                        imageId={answer?.user?.loginType === "default" 
                          ? ImageURL(answer?.user.avator!, "avatar")
                          : answer?.user?.avator!}
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
      props: {},
    };
  }

  if (Number.isNaN(+ctx.params.id)) {
    return {
      props: {},
    };
  }

  const id = ctx.params.id;

  const post = await client.post.findUnique({
    where: {
      id: Number(ctx?.params?.id),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avator: true,
          loginType: true,
        },
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
              avator: true,
              loginType: true,
            },
          },
        },
      },
      _count: {
        select: {
          answers: true,
          wondering: true,
        },
      },
    },
  });

  const isWondering = Boolean(
    await client.wondering.findFirst({
      where: {
        postId: Number(ctx?.params?.id),
        userId: post?.id,
      },
      select: {
        id: true,
      },
    })
  );

  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
      isWondering,
      id,
    },
  };
}