import type { NextPage } from 'next'
import Layout from '@components/Common/Layout';
import SubmitBtn from '@components/Form/SubmitBtn';
import TextArea from '@components/Form/TextArea';
import NormalInput from '@components/Form/NormalInput';
import { useForm } from 'react-hook-form';
import useMutation from '../../libs/client/useMutation';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Stream } from '@prisma/client';

interface CreateForm {
    name: string;
    price: number;
    description: string;
}

interface CreateResponse {
    ok: boolean,
    stream: Stream
}

const Create: NextPage = () => { 

    const router = useRouter();
    const [createLive, {data, loading}] = useMutation<CreateResponse>(`/api/streams`);

    console.log(createLive);
    

    const { register, handleSubmit } = useForm<CreateForm>();
    const onValid = (form: CreateForm) => {
        if (loading) return;
        createLive(form);
    }

    useEffect(() => {
        if (data && data.ok) {
            router.push(`/stream/${data.stream?.id}`)
        }
    }, [data, router]);

    return (
        <Layout canGoBack>
            <form className='px-4 py-4 space-y-4' onSubmit={handleSubmit(onValid)}>
                <div>
                    <NormalInput
                        kind='email'
                        type='text'
                        Name='name'
                        Label='Name'
                        register={register("name", {
                            required: {
                                value: true,
                                message: "제목을 입력 해주세요"
                            } 
                        })}
                    />
                </div>
                <div>
                    <NormalInput
                        type='number'
                        kind='price'
                        Name='price'
                        Label='Price'
                        register={register("price", {
                            required: {
                                value: true,
                                message: '가격을 입력해 주세요'
                            },
                            valueAsNumber: true
                        })}
                    />
                </div>
                <TextArea
                    Placeholder='introduce your item'
                    Name='Description'
                    register={register("description", {
                        minLength: {
                            value: 10,
                            message: "설명은 최소 10글자 이상이어야 합니다."
                        }
                    })}
                />
                <SubmitBtn
                    Content='Go Live'
                />
            </form>
        </Layout>
    )
}

export default Create; 