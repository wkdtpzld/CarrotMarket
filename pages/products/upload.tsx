import type { NextPage } from 'next'
import Layout from '@components/Common/Layout';
import NormalInput from '@components/Form/NormalInput';
import SubmitBtn from '@components/Form/SubmitBtn';
import TextArea from '@components/Form/TextArea';
import { useForm } from 'react-hook-form';
import useMutation from '@libs/client/useMutation';
import { useEffect } from 'react';
import { Product } from '@prisma/client';
import { useRouter } from 'next/router';

interface UploadProductForm {
    name: string;
    price: number;
    description: string;
}

interface UploadProductMutation {
    ok: boolean;
    product: Product;
}

const Upload: NextPage = () => { 

    const router = useRouter();
    const { register, handleSubmit } = useForm<UploadProductForm>();
    const [uploadProduct, { loading, data, error }] = useMutation<UploadProductMutation>("/api/products");
    const onValid = (data: UploadProductForm) => {
        if (loading) return;
        uploadProduct(data);
    };

    useEffect(() => {
        if (data?.ok) {
            router.push(`/products/${data.product.id}`)
        }
    }, [data, router]);

    return (
        <Layout canGoBack>
            <form className='px-4 py-16 space-y-4' onSubmit={handleSubmit(onValid)}>
                <div>
                    <label className='w-full flex items-center justify-center text-gray-600 hover:text-orange-400
                        border-2 border-dashed border-gray-300 h-48 rounded-md hover:border-orange-400'>
                        <svg className="h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <input className='hidden' type="file" />
                    </label>
                </div>
                <div>
                    <NormalInput type='text' kind='email' Name='name' Label='Name' register={register("name")} required={true}/>
                </div>
                <div>
                    <NormalInput type='number' kind='price' Name="price" Label='Price' register={register("price")} required={true}/>
                </div>
                <TextArea Name='Description' Placeholder='please Input Description' register={register("description")} required={true}/>
                <SubmitBtn Content={loading ? "loading" : "Upload product"} />
            </form>
        </Layout>
    )
}

export default Upload; 