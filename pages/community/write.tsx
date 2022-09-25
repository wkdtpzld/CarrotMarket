import type { NextPage } from 'next'
import Layout from '../../components/Layout';

const WriteCommunity: NextPage = () => { 

    return (
        <Layout canGoBack>
            <form className='px-4 py-10'>
                <textarea
                    rows={4}
                    className="mt-1 shadow-sm w-full focus:ring-orange-500 rounded-md
                    border-gray-300 focus:border-orange-500"
                    placeholder='Answer this question'
                >
                </textarea>
                <button className='mt-4 w-full bg-orange-500 hover:bg-orange-600 
                        text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium
                        focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none'>
                    Submit
                </button>
            </form>
        </Layout>
    )
}

export default WriteCommunity;