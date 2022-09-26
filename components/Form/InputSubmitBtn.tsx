
const InputSubmitBtn = () => {
    
    return (
        <div className='fixed w-full mx-auto max-w-md bottom-3 inset-x-0'>
            <div className='flex items-center relative'>
                <input type="text" className='shadow-sm rounded-full w-full border-gray-300
                    focus:ring-orange-500 focus:outline-none focus:border-orange-500 pr-12'/>
                <div className='absolute inset-y-0 flex py-1.5 pr-1.5 right-0'>
                    <button className='flex items-center bg-orange-500 rounded-full px-3 text-sm text-white
                        hover:bg-orange-600 cursor-pointer focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'>
                        &rarr;</button>
                </div>
            </div>
        </div>
    )
}

export default InputSubmitBtn