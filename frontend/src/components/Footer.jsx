import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        <div>
            <img src={assets.logo1} className='mb-5 w-32' alt="" />
            <p className='w-full md:w-2/3 text-gray-600'>
            A fashion website featuring stylish collections with pages for Latest Arrivals, Best Sellers, and curated Collections. The About page shares the brand’s story and values, while the Contact page offers easy ways to reach support. Users can subscribe to updates on new items, trends, and exclusive offers. 
            </p>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>Contact Number: 9014781656</li>
                <li>akashreddybiyyam@gmail.com</li>
            </ul>
        </div>

      </div>

        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2025@ akashreddybiyyam@gmail.com - All Right Reserved.</p>
        </div>

    </div>
  )
}

export default Footer
