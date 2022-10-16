import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import SubmitBtn from "@components/Form/SubmitBtn";
import useMutation from "@libs/client/useMutation";
import { cls } from "@libs/client/utils";
import { useRouter } from 'next/router';
import dynamic from "next/dynamic"
import Head from "next/head";
import { useSession, signIn, signOut } from "next-auth/react"
import { User } from "next-auth";

const NormalInput = dynamic(() => import("@components/Form/NormalInput"));

interface EnterForm {
  email?: string;
  phone?: string;
  token?: string;
}

interface EnterMutationResult {
  ok: boolean;
}

interface oAuthResponse {
  ok: boolean,
  user: User
}

export default function Enter() {

  const router = useRouter();

  // OAuth Login
  const { data: nextAuthData } = useSession();
  const [oAuthSignIn, { data: oAuthLoginData, loading: oAuthLoading }]
    = useMutation<oAuthResponse>(`/api/users/oauth`, "POST");
  
  const onOAuthLogin = (type: string) => {
    signIn(type);
  }

  useEffect(() => {
    if (nextAuthData) {
      if (oAuthLoading) return;
      oAuthSignIn({
        email: nextAuthData.user?.email,
        name: nextAuthData.user?.name,
        photo: nextAuthData.user?.image
      });
    };
  }, [oAuthLoading, oAuthSignIn, nextAuthData]);

  useEffect(() => {
    if (oAuthLoginData && oAuthLoginData?.ok) {
      signOut();
      router.push('/');
    }
  }, [oAuthLoginData, router]);

  // useMutation
  const [enter, { loading, data, error }]
    = useMutation<EnterMutationResult>("/api/users/enter", "POST");
  
  const [
    confirmToken,
    { loading: tokenLoading, data: tokenData, error: tokenError },
  ] = useMutation<EnterMutationResult>("/api/users/confirm", "POST");

  // useForm
  const { register, reset, handleSubmit } = useForm<EnterForm>();
  const { register: tokenRegister, handleSubmit: tokenHandleSubmit } =
    useForm<EnterForm>();

  const onValid = (data: EnterForm) => {
    enter(data);
  };

  const onTokenValid = (validData: EnterForm) => {
    if (tokenLoading) return;
    confirmToken(validData);
  };

  // Email || Phone
  const [method, setMethod] = useState<"email" | "phone">("email");

  // Reset Logic
  const onEmailClick = () => {
    reset();
    setMethod("email");
  };
  const onPhoneClick = () => {
    reset();
    setMethod("phone");
  };

  // Login Success router push logic
  useEffect(() => {
    if (tokenData) {
      router.push("/");
    }
  }, [tokenData, router]);

  return (
    <>
      <Head>
        <title>Enter | Carrot Market</title>
      </Head>
      <div className="mt-16 px-4">
        <h3 className="text-3xl font-bold text-center">Login / SignUp</h3>
        <div className="mt-8">
          {data?.ok ? (
            <form
              className="flex flex-col mt-8"
              onSubmit={tokenHandleSubmit(onTokenValid)}
            >
              <div className="mt-1">
                <NormalInput
                  required
                  kind="email"
                  type="number"
                  Label="Confirm Token"
                  Name="token"
                  register={tokenRegister("token", {
                    required: true,
                  })}
                />
              </div>
              <SubmitBtn Content={tokenLoading ? "Loading" : "Confirm Token"} />
            </form>
          ) : (
            <>
              <div className="flex flex-col items-center">
                <h5 className="text-sm text-gray-500 font-medium">
                  Enter using
                </h5>
                <h5 className="text-sm text-gray-500 font-medium mt-3">
                  이메일 인증으로 간단하게 이용해보세요.
                </h5>
                <div className="grid grid-cols-2 gap-16 mt-8 border-b w-full">
                  <button
                    className={cls(
                      "pb-4 font-medium border-b-2 transition duration-500",
                      method === "email"
                        ? "text-orange-400 border-orange-500"
                        : "border-transparent text-gray-400"
                    )}
                    onClick={onEmailClick}
                  >
                    Email
                  </button>
                  <button
                    className={cls(
                      "pb-4 font-medium border-b-2 transition duration-500",
                      method === "phone"
                        ? "text-orange-400 border-orange-500"
                        : "border-transparent text-gray-400"
                    )}
                    onClick={onPhoneClick}
                  >
                    Phone
                  </button>
                </div>
              </div>
              <form
                className="flex flex-col mt-8"
                onSubmit={handleSubmit(onValid)}
              >
                <div className="mt-1">
                  {method === "email" ? (
                    <NormalInput
                      required
                      kind="email"
                      type="text"
                      Label="email"
                      Name="Email address"
                      register={register("email", {
                        required: true,
                      })}
                    />
                  ) : null}
                  {method === "phone" ? (
                    <NormalInput
                      required
                      kind="phone"
                      Name="Phone number"
                      Label="phone"
                      type="number"
                      register={register("phone", {
                        required: true,
                      })}
                    />
                  ) : null}
                </div>
                <SubmitBtn
                  Content={
                    method === "email"
                      ? loading
                        ? "Loading"
                        : "Get Login Link"
                      : loading
                      ? "Loading"
                      : "Get one-time password"
                  }
                />
              </form>
            </>
          )}

          <div className="mt-6">
            <div className="relative">
              <div className="absolute w-full border-t border-gray-300" />
              <div className="relative -top-3 text-center">
                <span className="bg-white px-2 text-sm text-gray-500">
                  Or enter with
                </span>
              </div>
            </div>
            <div className="gap-3 my-6">
              <button
                onClick={() => onOAuthLogin('github')}
                className="flex justify-center items-center py-2 px-4 w-full
                            border-gray-300 border shadowm-sm bg-white font-medium text-gray-500 hover:bg-gray-50"
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}