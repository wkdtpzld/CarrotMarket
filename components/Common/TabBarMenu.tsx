import Link from 'next/link';

interface IProps {
    to: string;
    IconD: string;
    title: string;
}

const TabBarMenu = ({to, IconD, title}:IProps) => {

    return (
        <Link href={to}>
            <a className='flex flex-col items-center space-y-2' >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d={IconD} />
                </svg>
                <span>{title}</span>    
            </a>
        </Link>
    )
}

export default TabBarMenu;