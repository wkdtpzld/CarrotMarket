import { Product, Record } from '@prisma/client';
import useSWR from 'swr';
import Item from './Item';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

interface IProps {
    kind: "Fav" | "Sale" | "Purchase"
}

interface ProductWithCount extends Product {
    _count: {
        records: number
    }
}

interface RecordWithProduct extends Record {
    product: ProductWithCount
    
}

interface ProductListResponse {
    ok: boolean;
    records: RecordWithProduct[]
}


const ProductListItems = ({kind}:IProps) => {
    const { data } = useSWR<ProductListResponse>(`/api/users/me/records?kind=${kind}`);

    return (
        <>
            <div className='flex px-4 flex-col space-y-5 py-10'>
            {data
                    ? (
                    <>
                        {data?.records.map((record) => (
                            <Item
                                key={record?.id}
                                id={record?.id}
                                Name={record?.product?.name}
                                Category='category'
                                Price={record?.product?.price}
                                Like={record?.product._count.records}
                                ChatCount={3}
                            />
                        ))}
                    </>
                ) : (
                    <>
                    {[1, 1, 1, 1, 1, 1].map((_, i) => (
                        <div className='flex py-4 justify-between' key={i}>
                            <div className='flex space-x-4'>
                            <Skeleton width={80} height={80} />
                            <div className='pt-2 flex flex-col'>
                                <Skeleton width={100} />
                                <Skeleton width={80} height={10} />
                                <Skeleton width={100} height={23} />
                            </div>
                            </div>
                            <div className='flex items-end justify-end space-x-1.5'>
                                <Skeleton width={30} />
                                <Skeleton width={30} />
                            </div>
                        </div>
                        ))}
                    </>
                )}
            </div>
        </>
    )
}

export default ProductListItems;