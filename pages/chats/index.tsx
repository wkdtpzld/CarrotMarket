import type { NextPage } from 'next'
import ChatItem from '@components/Items/ChatItem'
import Layout from '@components/Common/Layout'
import useSWR from 'swr';
import { ChatRoom, Message, Product, User } from '@prisma/client';
import Link from 'next/link';

interface MessageWithUser extends Message {
    user: User
}

interface ChatRoomWithMessage extends ChatRoom {
    message: MessageWithUser[];
    product: Product
}

interface ChatRoomsResponse {
    ok: boolean;
    chatRooms: ChatRoomWithMessage[]
}

const Chats: NextPage = () => {

    const { data } = useSWR<ChatRoomsResponse>(`api/chat`);

    console.log(data);
    

    return (
        <Layout title='채팅' hasTabBar>
            <div className='py-10 divide-y-2'>
                {data?.chatRooms.map(chatRoom => (
                    <div key={chatRoom.id}>
                        <Link href={`chats/${chatRoom.id}`}>
                            <a>
                                <ChatItem
                                    Name={chatRoom.message[0] ? chatRoom.message[0]?.user.name : chatRoom.product.name}
                                    LastChat={chatRoom.message[0] ? chatRoom.message[0]?.message : "아직 채팅이 없습니다. 대화를 나눠보세요."}
                                    imageId={chatRoom.message[0] ? chatRoom.message[0]?.user.avator! : chatRoom.product.image}
                                />
                            </a>
                        </Link>
                    </div>
                ))}
            </div>
        </Layout>
    )
}

export default Chats