import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SWRConfig } from "swr";
import LoginCheck from '@components/Common/LoginCheck';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <SWRConfig
        value={{
          fetcher: (url: string) =>
            fetch(url).then((response) => response.json())
          }}>
        <div className='w-full max-w-lg mx-auto'>
          <LoginCheck />
          <Component {...pageProps} />
        </div>
      </SWRConfig>
    </>
  )
  
  
}

export default MyApp
