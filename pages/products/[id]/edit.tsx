import Layout from "@components/Common/Layout";
import useUser from "@libs/client/useUser";
import { ImageURL } from "@libs/client/utils";
import { GetServerSideProps, NextPage, NextPageContext } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import client from "@libs/server/client";
import useSWR, { SWRConfig } from "swr";
import { useRouter } from 'next/router';
import { ItemDetailResponse } from './index';
import { useForm } from "react-hook-form";
import NormalInput from "@components/Form/NormalInput";
import TextArea from "@components/Form/TextArea";
import SubmitBtn from "@components/Form/SubmitBtn";
import useMutation from '../../../libs/client/useMutation';
import { withSsrSession } from "@libs/server/withSession";

interface EditProductForm {
    photo: FileList;
    name: string;
    price: number;
    description: string;
}

const ProductEdit: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit, watch, formState: { errors }, setValue,} = useForm<EditProductForm>();

  const [avatarPreview, setAvatarPreview] = useState("");
  const { data } = useSWR<ItemDetailResponse>(
    router.query.id ? `/api/products/${router.query.id}/edit` : null
  );

  const [updateProduct, { data: updateData, loading: updateLoading }] =
    useMutation(`/api/products/${router.query.id}`, "PATCH");

  const avatar = watch("photo");

  useEffect(() => {
    if (data) {
      if (data?.product?.image) setAvatarPreview(ImageURL(data.product.image, "public"));
      if (data?.product?.name) setValue("name", data.product.name);
      if (data?.product?.price) setValue("price", data.product.price);
      if (data?.product?.description) setValue("description", data.product.description);
    }
  }, [data, setValue]);

  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setAvatarPreview(URL.createObjectURL(file));
    }
  }, [avatar]);

  useEffect(() => {
    if (updateData && updateData.ok) {
      router.push(`/products/${router.query.id}`);
    }
  }, [router, updateData]);

  const onValid = async ({
    photo,
    name,
    price,
    description,
  }: EditProductForm) => {
    if (updateLoading) return;

    if (photo && photo.length > 0) {
      const { uploadURL } = await (await fetch(`/api/files`)).json();

      const form = new FormData();
      form.append("file", photo[0], String(data?.product.name));

      const {
        result: { id },
      } = await (
        await fetch(uploadURL, {
          method: "POST",
          body: form,
        })
      ).json();

      updateProduct({ name, price, description, photo: id });
    } else {
      updateProduct({ name, price, description });
    }
  };

  return (
    <>
      <Layout canGoBack>
      {data && data.ok ? (
          <div className="px-4 py-5">
            <form onSubmit={handleSubmit(onValid)}>
              <div className="text-3xl text-gray-700 mb-4 font-bold">Edit</div>
              <div className="flex items-center space-x-3">
                <label className="relative w-full rounded-md pb-96 mb-6 text-gray-600 object-contain bg-slate-300">
                  <Image
                    src={avatarPreview}
                    className="w-full rounded-md text-gray-600 object-contain"
                    alt="preview"
                    layout="fill"
                  />
                  <input
                    className="hidden"
                    type="file"
                    accept="image/*"
                    {...register("photo")}
                  />
                </label>
              </div>
              <NormalInput
                type="text"
                kind="email"
                Name="name"
                Label="Name"
                register={register("name", {
                  required: {
                    value: true,
                    message: "?????? ????????? ??? ????????? ?????????.",
                  },
                  maxLength: {
                    value: 20,
                    message: "?????? ????????? 2????????? 20??? ????????? ????????? ?????????.",
                  },
                  minLength: {
                    value: 2,
                    message: "?????? ????????? 2????????? 20??? ????????? ????????? ?????????.",
                  },
                })}
                error={errors.name}
              />
              <NormalInput
                type="number"
                kind="price"
                Name="price"
                Label="Price"
                register={register("price", {
                  required: {
                    value: true,
                    message: "????????? ????????? ?????????.",
                  },
                  maxLength: {
                    value: 7,
                    message: "????????? ?????? ?????? ????????????????????????.",
                  },
                })}
                error={errors.price}
              />
              <TextArea
                Name="Description"
                Placeholder="please Input Description"
                register={register("description", {
                  required: {
                    value: true,
                    message: "?????? ????????? ????????? ????????? ?????????.",
                  },
                  minLength: {
                    value: 5,
                    message: "?????? ????????????. 5?????? ???????????? ??????????????????.",
                  },
                })}
                error={errors.description}
              />
              <SubmitBtn Content="Update Product" />
            </form>
          </div>
      ) : null}
    </Layout>
    </>
  );
}

const Page: NextPage<ItemDetailResponse> = ({ok, product}) => {

    const router = useRouter();

    return (
        <SWRConfig
            value={{
                fallback: {
                    [`api/product/${router.query.id}/edit`]: {
                        ok,
                        product
                    }
                }
            }}
        >
            <ProductEdit />
        </SWRConfig>
    )
}

export default Page

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
        ok: false,
      },
    };
  };

  const product = await client.product.findUnique({
    where: {
      id: Number(query.id),
    },
  });
  
  if (product?.userId !== req?.session.user?.id) {
    return {
      props: {
        ok: false
      }
    }
  }

  return {
    props: {
      ok: true,
      product: JSON.parse(JSON.stringify(product)),
    },
  };
});