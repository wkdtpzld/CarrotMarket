import type { NextPage } from 'next'
import Layout from '@components/Common/Layout';
import SubmitBtn from '@components/Form/SubmitBtn';
import TextArea from '@components/Form/TextArea';
import { useForm } from 'react-hook-form';
import useMutation from '../../libs/client/useMutation';
import { useEffect } from 'react';
import { Post } from '@prisma/client';
import { useRouter } from 'next/router';
import useCoords from '@libs/client/useCoords';

interface WriteForm {
    question: string;
}

interface WriteResponse {
    ok: boolean;
    post: Post;
}

const WriteCommunity: NextPage = () => { 

    const { latitude, longitude } = useCoords();

    const router = useRouter();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<WriteForm>();
    const [post, {loading, data}] = useMutation<WriteResponse>("/api/posts", "POST");
    const onValid = (data: WriteForm) => {
        if (loading) return;
        post({...data, latitude, longitude});
        setValue("question", "");
    };

    useEffect(() => {
        if (data && data.ok) {
            router.push(`/community/${data.post.id}`);
        }
    }, [data, router]);

    return (
        <Layout canGoBack>
            <form className='px-4 py-10' onSubmit={handleSubmit(onValid)}>
                <TextArea
                    Placeholder='Input your question'
                    register={register("question",
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
                    Name="Question"
                    required={true}
                    error={errors.question}
                />
                <SubmitBtn
                    Content={loading ? 'Loading' : "Submit"}
                />
            </form>
        </Layout>
    )
}

export default WriteCommunity;