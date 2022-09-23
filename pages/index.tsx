import type { NextPage } from 'next'
import tw from "tailwind-styled-components"


const Home: NextPage = () => {
  return (
    <div className="bg-slate-400 py-20 px-10 grid gap-10 min-h-screen">
      <div className="bg-white p-10 rounded-3xl shadow-xl">
        <span className='font-bold text-3xl'>Select Item</span>
        <ul>
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="flex justify-between my-2 odd:bg-yellow-50 even:bg-yellow-500 first:bg-blue-50 last:bg-blue-50 only:bg-red-500">
              <span className="text-gray-500">Grey chair</span>
              <span className='font-semibold'>$19</span>
            </div>
          ))}
        </ul>
        <ul>
          {["a", "b", "c", ""].map((c, i) => (
            <li key={i} className="bg-red-500 py-2 my-2 empty:hidden">{c}</li>
          ))}
        </ul>
        
        {/* <div className="flex justify-between my-2">
          <span className="text-gray-500">Grey chair</span>
          <span className='font-semibold'>$19</span>
        </div>
        <div className="flex justify-between my-2">
          <span className="text-gray-500">Tooly Table</span>
          <span className='font-semibold'>$19</span>
        </div> */}
        <div className='flex justify-between mt-2 pt-2 border-t-2'>
          <span className='font-semibold'>Total</span>
          <span className='font-semibold'>$19</span>
        </div>
        <button className="mt-5 bg-blue-500 text-white p-3 text-center rounded-xl w-1/2 mx-auto block hover:text-black active:bg-yellow-500 hover:bg-teal-500 focus:text-red-500">Checkout</button>
      </div>
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden group">
        <div className='bg-blue-500 p-6 pb-14'>
          <span className='text-white text-2xl'>Profile</span>
        </div>
        <div className='rounded-3xl p-6 bg-white relative -top-5'>
          <div className='flex relative -top-16 items-end justify-between'>
            <div className='flex flex-col items-center'>
              <span className='text-sm text-gray-500'>Orders</span>
              <span className='font-medium'>340</span>
            </div>
            <div className='h-24 w-24 bg-red-400 rounded-full       group-hover:bg-gray-500'/>
            <div className='flex flex-col items-center'>
              <span className='text-sm text-gray-500'>Spent</span>
              <span className='font-medium'>$2.310</span>
            </div>
          </div>
          <div className='relative flex flex-col items-center -mt-10 -mb-5'>
            <span className='text-lg font-medium'>Tony Molioy</span>
            <span className='text-sm text-gray-500'>America</span>
          </div>
        </div>
      </div>
      <div className="bg-white p-10 rounded-3xl shadow-xl">
        <div className='flex justify-between items-center mb-5'>
          <span>⬅️</span>
          <div className='space-x-3'>
            <span className=''>⭐️4.9</span>
            <span className='shadow-xl p-2 rounded-md'>❤</span>
          </div>
        </div>
        <div>
          <div className='bg-zinc-400 h-80 mb-5'></div>
          <div className='flex flex-col'>
            <span className='font-medium mb-1.5 text-xl' >Swoon Lounge</span>
            <span className='text-xs text-gray-500'>Chair</span>
            <div className='mt-3 mb-5 flex items-center justify-between'>
              <div className='space-x-2'>
                <button className='w-5 h-5 rounded-full bg-yellow-500 focus:ring-2 ring-offset-2 ring-yellow-500 transition' />
                <button className='w-5 h-5 rounded-full bg-indigo-500 focus:ring-2 ring-offset-2 ring-indigo-500 transition' />
                <button className='w-5 h-5 rounded-full bg-teal-500 focus:ring-2 ring-offset-2 ring-teal-500 transition' />
              </div>
              <div className='flex items-center space-x-5'>
                <button className='bg-blue-200 rounded-lg font-medium text-1xl text-gray-500 w-8 aspect-square flex justify-center items-center'>-</button>
                <span>1</span>
                <button className='bg-blue-200 rounded-lg font-medium text-1xl text-gray-500 w-8 aspect-square flex justify-center items-center'>+</button>
              </div>
            </div>
          </div>
          <div className='flex justify-between items-center'>
            <span className='font-medium text-2xl'>$450</span>
            <button className='bg-blue-500 text-center text-white rounded-lg py-2 px-8 text-xs'>Add to Cart</button>
          </div>
        </div>
      </div>
      <div className="bg-white p-10 rounded-3xl shadow-xl"></div>
    </div>
  )
}

export default Home;