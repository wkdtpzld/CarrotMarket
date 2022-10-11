import type { NextPage } from 'next'
import Layout from '@components/Common/Layout';
import NormalInput from '@components/Form/NormalInput';
import SubmitBtn from '@components/Form/SubmitBtn';
import TextArea from '@components/Form/TextArea';
import { useForm } from 'react-hook-form';
import useMutation from '@libs/client/useMutation';
import { useEffect, useState } from 'react';
import { Product } from '@prisma/client';
import { useRouter } from 'next/router';
import { ImageURL } from '../../libs/client/utils';
import Image from 'next/image';

interface UploadProductForm {
    name: string;
    price: number;
    description: string;
    photo: FileList
}

interface UploadProductMutation {
    ok: boolean;
    product: Product;
}

const Upload: NextPage = () => { 

    const [photoPreview, setPhotopreview] = useState("");

    const router = useRouter();
    const { register, handleSubmit, watch, formState: {errors}, reset } = useForm<UploadProductForm>();
    const [uploadProduct, { loading, data, error }] = useMutation<UploadProductMutation>("/api/products", "POST");
    const onValid = async ({name, price, photo, description}: UploadProductForm) => {
        if (loading) return;

        if (photo && photo.length > 0) {
            const { uploadURL } = await (await fetch(`/api/files`)).json();
            const form = new FormData();
            form.append("file", photo[0], name);

            const {result: {id}} = await (await fetch(uploadURL, {
                method: "POST",
                body: form
            })).json();

            uploadProduct({name, price, description, photoId:id});
            reset();
        } else {
            uploadProduct({name, price, description});
            reset();
        }

    };

    useEffect(() => {
        if (data?.ok) {
            router.push(`/products/${data.product.id}`)
        }
    }, [data, router]);

    const photo = watch("photo");
    useEffect(() => {
        if (photo && photo.length > 0) {
            const file = photo[0];
            setPhotopreview(URL.createObjectURL(file));
        }
    }, [photo])

    return (
        <Layout canGoBack seoTitle='uploadProduct | Carrot Market'>
            <form className='px-4 py-16 space-y-4' onSubmit={handleSubmit(onValid)}>
                <div>
                    {photoPreview
                        ?
                        <div className='relative w-full rounded-md aspect-video text-gray-600 object-contain'>
                            <Image
                                src={photoPreview}
                                className='w-full rounded-md text-gray-600 object-contain'
                                layout='fill'
                                alt='preview'
                            />
                        </div>
                        : (        
                        <label className='w-full flex items-center justify-center text-gray-600 hover:text-orange-400
                            border-2 border-dashed border-gray-300 h-48 rounded-md hover:border-orange-400'>
                            <svg className="h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <input 
                                className='hidden'
                                type="file"
                                {...register("photo", {
                                    required: {
                                        value: true,
                                        message: "상품 이미지는 반드시 첨부해 주세요."
                                    }
                                })}
                                
                                accept="image/*" />
                        </label>
                        )}
                        {errors.photo ?
                            <span className="text-sm text-red-600 font-medium ">{errors.photo.message}</span>
                        : null}
                </div>
                <div>
                    <NormalInput
                        type='text'
                        kind='email'
                        Name='name'
                        Label='Name'
                        register={register("name", {
                            required: {
                                value: true,
                                message: "상품 이름을 꼭 입력해 주세요."
                            },
                            maxLength: {
                                value: 20,
                                message: "상품 이름은 2자에서 20자 이내로 설정해 주세요."
                            },
                            minLength: {
                                value: 2,
                                message: "상품 이름은 2자에서 20자 이내로 설정해 주세요."
                            }
                        })}
                        error={errors.name}
                        />
                </div>
                <div>
                    <NormalInput
                        type='number'
                        kind='price'
                        Name="price"
                        Label='Price'
                        register={register("price", {
                            required: {
                                value: true,
                                message: "가격을 입력해 주세요."
                            },
                            maxLength: {
                                value: 7,
                                message: "가격이 너무 높게 설정되어있습니다."
                            }
                        })}
                        error={errors.price}
                        />
                </div>
                <TextArea
                    Name='Description'
                    Placeholder='please Input Description'
                    register={register("description", {
                        required: {
                            value: true,
                            message: "상품 설명은 반드시 입력해 주세요."
                        },
                        minLength: {
                            value: 5,
                            message: "너무 짧습니다. 5글자 이상으로 입력해주세요."
                        }
                    })}
                    error={errors.description}
                />
                <SubmitBtn Content={loading ? "loading" : "Upload product"} />
            </form>
        </Layout>
    )
}

export default Upload; 