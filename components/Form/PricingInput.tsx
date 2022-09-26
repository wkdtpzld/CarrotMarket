
const PricingInput = () => {

    return (
        <div>
            <label htmlFor='price' className='text-sm font-medium text-gray-700'>Price</label>
            <div className='rounded-md shadow-sm relative flex items-center '>
                <div className='absolute left-0 pl-3 flex items-center justify-center pointer-events-none'>
                    <span className='text-gray-500 text-sm'>$</span>
                </div>
                <input id='price' type="text" placeholder="0.00"
                    className='appearance-none w-full px-3 py-2 pl-7 border
                        border-gray-300 shadow-sm rounded-md placeholder-gray-400 
                        focus:outline-none focus:ring-orange-500 focus:border-orange-500'/>
                <div className='absolute right-0 pr-3 flex items-center pointer-events-none'>
                    <span>USD</span>
                </div>
            </div>
        </div>
    )
}

export default PricingInput;