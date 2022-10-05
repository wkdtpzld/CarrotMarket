import Link from 'next/link';
import { useRouter } from 'next/router';
import { cls, MenuIconType } from '../../libs/client/utils';
import TabBarMenu from './TabBarMenu';
interface LayoutProps {
    children: React.ReactNode
    title?: string;
    canGoBack?: boolean;
    hasTabBar?: boolean;
}

export default function Layout({ title, canGoBack, hasTabBar, children }: LayoutProps) {
    
    const router = useRouter();
    const onClick = () => {
        router.back();
    }

    return (
        <div>
            <div className={cls("bg-white w-full text-lg font-medium px-10 py-3 fixed text-gray-700 border-b top-0 flex items-center max-w-xl z-50"
                , !canGoBack ? "justify-center" : "")}>
                {canGoBack ?
                    <button onClick={onClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                    : null}
                {title ? <span>{title}</span> : null}
            </div>
            <div className={cls("pt-14", hasTabBar ? "pb-24" : "")}>
                {children}
            </div>
            {hasTabBar ? <nav className='z-50 bg-white text-gray-800 border-t fixed bottom-0 px-10 pb-3 pt-3
                flex justify-between items-center max-w-xl w-full'>
                <TabBarMenu
                    IconD={MenuIconType.Home}
                    to='/'
                    title='홈'
                    router='/'
                />
                <TabBarMenu
                    IconD={MenuIconType.Community}
                    to='/community'
                    title='동내생활'
                    router='/community'
                />
                <TabBarMenu
                    IconD={MenuIconType.Chat}
                    to='/chats'
                    title='채팅'
                    router='/chats'
                />
                <TabBarMenu
                    IconD={MenuIconType.Live}
                    to='/stream'
                    title='스트리밍'
                    router='/stream'
                />
                <TabBarMenu
                    IconD={MenuIconType.Profile}
                    to='/profile'
                    title='프로필'
                    router='/profile'
                />
            </nav> : null}
        </div>
    )
}