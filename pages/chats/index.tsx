import type { NextPage } from 'next'
import ChatItem from '@components/Items/ChatItem'
import Layout from '@components/Common/Layout'

const Chats: NextPage = () => { 

    return (
        <Layout title='채팅' hasTabBar>
            <div className='py-10 divide-y-2'>
                <ChatItem
                    Name='장세득'
                    LastChat='쥐어짜기전에 나와'
                />
                <ChatItem
                    Name='장세득'
                    LastChat='쥐어짜기전에 나와'
                />
                <ChatItem
                    Name='장세득'
                    LastChat='쥐어짜기전에 나와'
                />
                <ChatItem
                    Name='장세득'
                    LastChat='쥐어짜기전에 나와'
                />
            </div>
        </Layout>
    )
}

export default Chats