import Layout from "@components/Common/Layout";
import SubmitBtn from "@components/Form/SubmitBtn";
import TextArea from "@components/Form/TextArea";
import { NextPage, GetStaticProps, GetStaticPaths, GetStaticPropsContext, GetServerSideProps, NextPageContext } from 'next';
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import useMutation from '../../../libs/client/useMutation';
import {useEffect} from 'react';
import { Post } from "@prisma/client";
import client from "@libs/server/client";
import useSWR, { SWRConfig } from "swr";
import { withApiSession, withSsrSession } from '@libs/server/withSession';
import { NextResponse } from "next/server";

interface EditForm{
    message: string;
}

interface EditPostResponse {
    ok: boolean,
    post: Post
}

const EditPost: NextPage = () => {

    const router = useRouter();
    const { data } = useSWR<EditPostResponse>(router.query.id ? `/api/posts/${router.query.id}/edit` : null);

    const [updatePosts, { data: updateData, loading }]
        = useMutation<EditPostResponse>(`/api/posts/${router.query.id}`, "PATCH");
    
    const { register, handleSubmit, formState: {errors}, setValue } = useForm<EditForm>();
    const onValid = ({ message }: EditForm) => {
        
        if (loading) return;
        updatePosts({ message });
    };

    useEffect(() => {
        if (data?.post?.question) return setValue("message", data.post.question);
    }, [data, setValue]);

    useEffect(() => {
        if (updateData && updateData.ok) {
            router.push(`/community/${router.query.id}`);
        }
    }, [router, updateData]);

    return (
        <Layout canGoBack>
            {data && data.ok
                ? (
                    <div className="mx-4 my-10">
                        <div className="text-3xl text-gray-700 mb-4 font-bold">
                            Edit
                        </div>
                        <form onSubmit={handleSubmit(onValid)}>
                            <TextArea
                                Placeholder="Edit your Question"
                                register={register("message",
                                {
                                    required: {
                                        message: "질문은 5글자 이상으로 입력해주세요",
                                        value: true
                                    },
                                    minLength: {
                                        message: "질문은 5글자 이상으로 입력해주세요",
                                        value: 5
                                    }
                                })}
                                error={errors.message}
                            />
                            <SubmitBtn
                                Content="Update Question"
                            />
                        </form>
                    </div>
                ) : (
                    null
                )
            }
            
        </Layout>
    )
}

const Page: NextPage<EditPostResponse> = ({post, ok}) => {

    const router = useRouter();

    return (
        <SWRConfig
            value={{
                fallback: {
                    [`/api/posts/${router.query.id}/edit`]: {
                        ok,
                        post
                    }
                }
            }}
        >
            <EditPost />
        </SWRConfig>
    )
}

export default Page;

export const getServerSideProps = withSsrSession(async function (
    { req, query }: NextPageContext
) {
    
    if (!query.id) {
        return {
            props: {
                ok: false
            }
        }
    };

    if (Number.isNaN(+query.id)) {
        return {
            props: {
                ok: false
            }
        }
    }

    const targetPost = await client.post.findUnique({
        where: {
            id: Number(query.id)
        }
    });
    
    if (targetPost?.userId !== req?.session.user?.id) {
        return {
            props: {
                ok: false
            }
        }
    }

    return {
        props: {
            ok: true,
            post: JSON.parse(JSON.stringify(targetPost))
        }
    }
})