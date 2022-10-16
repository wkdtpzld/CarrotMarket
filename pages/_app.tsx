import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SWRConfig } from "swr";
import LoginCheck from '@components/Common/LoginCheck';
import { useRouter } from 'next/router';
import { SessionProvider } from "next-auth/react"
import { Session } from 'next-auth';


function MyApp({ Component, pageProps }: AppProps<{session: Session}>) {

  const router = useRouter();

  return (
    <>
      <SessionProvider session={pageProps.session}>
        <SWRConfig
          value={{
            fetcher: (url: string) =>
              fetch(url).then((response) => response.json())
            }}>
          <div className='w-full max-w-lg mx-auto '>
            {router.pathname !== "/enter" ? <LoginCheck /> : null}
            <Component {...pageProps} />
          </div>
        </SWRConfig>
      </SessionProvider>
    </>
  )
  
  
}

export default MyApp
