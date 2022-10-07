import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SWRConfig } from "swr";
import LoginCheck from '@components/Common/LoginCheck';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {

  const router = useRouter();

  return (
    <>
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
    </>
  )
  
  
}

export default MyApp
