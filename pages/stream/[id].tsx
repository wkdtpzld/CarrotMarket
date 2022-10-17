import type { NextPage, NextPageContext } from 'next'
import InputSubmitBtn from '@components/Form/InputSubmitBtn';

import Layout from '@components/Common/Layout';
import ChattingBubble from '@components/Items/ChattingBubble';
import useSWR, { SWRConfig } from 'swr';
import { useRouter } from 'next/router';
import { Stream, User } from '@prisma/client';
import { useForm } from 'react-hook-form';
import useMutation from '@libs/client/useMutation';
import useUser from '../../libs/client/useUser';
import NotFound from '@components/Common/NotFound';
import { ImageURL } from '@libs/client/utils';
import { withSsrSession } from '@libs/server/withSession';
import client from '@libs/server/client';

interface StreamMessage {
    message: string;
    id: number;
    user: User
}

interface StreamWithMessage extends Stream{
    messages: StreamMessage[]
}

interface StreamResponse {
    ok: boolean;
    stream: StreamWithMessage
}

export interface MessageForm {
    message: string;
}

const LiveDetail: NextPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const { data, mutate } = useSWR<StreamResponse>(
    router.query.id ? `/api/streams/${router.query.id}` : null,
    {
      refreshInterval: 1000,
    }
  );

  const [sendMessage, { data: messageData, loading }] = useMutation(
    `/api/streams/${router.query.id}/message`,
    "POST"
  );

  const [
    deleteStream,
    { data: DeleteStreamData, loading: DeleteStreamLoading },
  ] = useMutation(`/api/streams/${router.query.id}`, "POST");

  const { register, handleSubmit, reset } = useForm<MessageForm>();
  const onValid = (form: MessageForm) => {
    if (loading) return;
    reset();
    mutate(
      (prev) =>
        prev &&
        ({
          ...prev,
          stream: {
            ...prev.stream,
            messages: [
              ...prev.stream.messages,
              { id: Date.now(), message: form.message, user: { ...user } },
            ],
          },
        } as any),
      false
    );

    sendMessage(form);
  };

  const onClick = () => {
    deleteStream("");
    router.replace("/stream");
  };

  return (
    <Layout canGoBack>
      {data?.stream ? (
        <div className="py-10 space-y-4">
          <div className="pt-4 px-4 relative">
            <div className="bg-slate-300 aspect-video rounded-md">
              <iframe
                className="w-full aspect-video rounded-md shadow-sm"
                src={`https://iframe.videodelivery.net/${data.stream.cloudflareId}`}
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                allowFullScreen={true}
              ></iframe>
            </div>
            <h3 className="text-gray-800 font-bold text-2xl mt-5">
              {data?.stream.name}
            </h3>
            <span className="text-2xl block mt-3 text-gray-900">
              ${data?.stream.price}
            </span>
            <p className="my-6 text-gray-700">{data?.stream.description}</p>
            <div className="bg-orange-300 flex flex-col space-y-3 rounded-md overflow-scroll text-sm py-2 px-2">
              <span>Stream Keys (secret)</span>
              <span className="text-white">
                <span className="font-medium text-gray-700 select-none">
                  URL:
                </span>
                {data.stream.cloudflareUrl}
              </span>
              <span className="text-white">
                <span className="font-medium text-gray-700 select-none">
                  Key:
                </span>
                {data.stream.cloudflareKey}
              </span>
            </div>
            {data.stream.userId === user?.id ? (
              <button
                onClick={onClick}
                className="w-24 h-10 bg-orange-400 mt-3 rounded-md text-white text-sm absolute right-4"
              >
                라이브 종료
              </button>
            ) : null}
          </div>
          <div className="py-10 space-y-4 h-[50vh] pb-16 overflow-y-scroll scrollbar-hide">
            <span className="px-4 text-3xl font-bold">Live Chat</span>
            {data?.stream?.messages.map((item) => (
              <div key={item.id} className="px-4 py-4">
                <ChattingBubble
                  imageId={
                    item.user.loginType === "default"
                      ? ImageURL(item?.user?.avator!, "avatar")
                      : item?.user?.avator!
                  }
                  Message={item.message}
                  type={user?.id === item.user.id ? "inside" : "opposite"}
                />
              </div>
            ))}
          </div>
          <InputSubmitBtn
            register={register("message", {
              required: true,
            })}
            onSubmit={handleSubmit(onValid)}
          />
        </div>
      ) : (
        <NotFound Content="해당 스트리밍 정보를 찾을 수 없습니다." />
      )}
    </Layout>
  );
}

const Page: NextPage<{ok: boolean, stream: Stream}> = ({ok, stream}) => {

  const router = useRouter();

  return (
    <SWRConfig
      value={{
        fallback: {
          [`/api/streams/${router.query.id}`]: {
            ok,
            stream
          }
        }
      }}
    >
      <LiveDetail />
    </SWRConfig>
  )
}

export default Page;

export const getServerSideProps = withSsrSession(async function ({
  req, query
}: NextPageContext) {

  const stream = await client.stream.findUnique({
    where: {
      id: Number(query.id),
    },
    include: {
      messages: {
        select: {
          message: true,
          user: {
            select: {
              id: true,
              avator: true,
              loginType: true,
            },
          },
          id: true,
        },
      },
    },
  });

  const isOwner = stream?.userId === req?.session.user?.id;
  if (stream && !isOwner) {
    stream.cloudflareKey = "xxxxx";
    stream.cloudflareUrl = "xxxxx";
  }

  return {
    props: {
      ok: true,
      stream: JSON.parse(JSON.stringify(stream))
    }
  }
});