import { Product, Record } from '@prisma/client';
import useSWR from 'swr';
import Item from './Item';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

interface IProps {
    data: ProductListResponse[]
}

interface ProductWithCount extends Product {
    _count: {
        records: number,
        chatRoom: number,
    }
}

interface RecordWithProduct extends Record {
    product: ProductWithCount
    
}

export interface ProductListResponse {
    ok: boolean;
    records: RecordWithProduct[],
    pages: number
}


const ProductListItems = ({data}:IProps) => {

    return (
        <>
            <div className='flex px-4 flex-col space-y-5 py-10'>
                {data ? (
                    data?.map(item => {
                        return item.records.map((record) => (
                            <Item
                                image={record.product.image}
                                key={record?.id}
                                id={record?.product.id}
                                Name={record?.product?.name}
                                Category='category'
                                Price={record?.product?.price}
                                Like={record?.product._count.records}
                                ChatCount={record.product._count.chatRoom}
                            />
                        ))
                    })
                ) : (
                        null
                )}
            </div>
        </>
    )
}

export default ProductListItems;