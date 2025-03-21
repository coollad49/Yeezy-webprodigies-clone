"use client"

import { Minus, MoreVertical, Plus, ShoppingCart, X } from 'lucide-react'
import React, { useState } from 'react'
import { mockProduct, navbarData } from '@/lib/data'
import Link from 'next/link'
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from './sheet'
import { useCart } from '@/hooks/use-cart'
import Image from 'next/image'

type Props = {
    products: any[]
}

const ProductGrid = ({products}: Props) => {
    const [toggle, setToggle] = useState(false)
    const {cartTotal, items: cartItems, updateProduct: updateQuantity, deleteProduct: removeFromCart, isOpen, setIsOpen} = useCart()
  return (
    <div className='min-h-screen bg-white'>
        <header className="sticky h-0 z-10 bg-white">
            <div className='container mx-auto px-4 py-4 flex justify-between'>
                <button onClick={()=> setToggle(!toggle)}>
                    { toggle ? (<X className='w-6 h-6 font-bold'/>) : (<MoreVertical className='w-6 h-6 font-bold'/>)}
                </button>
                {toggle && 
                (<div className='w-full gap-x-12 flex items-center justify-center'>{ navbarData.map((item)=> (
                    <Link href={item.link} key={item.idx}>{item.title}</Link>
                ))}</div>)}
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <button className='text-lg gap-2 flex items-center '>
                            <span>Cart</span>
                            {cartItems.length != 0 && (
                                <span className='bg-black text-white rounded-full w-5 h-5 text-xs inline-flex justify-center items-center'>{cartTotal}</span>
                            )}
                        </button>
                    </SheetTrigger>
                    <SheetContent className='w-full sm:max-w-md'>
                        <SheetHeader>Your Cart</SheetHeader>
                        {cartItems.length === 0 ? 
                        (<div className='flex gap-3 flex-col items-center justify-center h-[50vh]'>
                            <ShoppingCart className='h-12 w-12 text-gray-300'/>
                            <p className='text-gray-500'>Your Cart is Empty</p>
                        </div>) : (<div className='h-full flex flex-col'>
                            <div className='flex-1 overflow-auto py-6'>
                                <ul className=' space-y-6'>
                                    {cartItems.map((item)=> (
                                        <li
                                        key={item.id}
                                        className='flex gap-4'>
                                            <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border'>
                                                <Image
                                                 src={'/placeholder.svg'}
                                                 alt={item.name}
                                                 width={96}
                                                 height={96}
                                                 className='h-full w-full object-contain p-2' 
                                                />
                                            </div>
                                            <div className='flex flex-1 flex-col'>
                                                <div className='flex justify-between text-base font-medium text-gray-900'>
                                                    <h3>{item.name}</h3>
                                                    <p className='ml-4'>${item.price}</p>
                                                </div>
                                                <div className='flex items-center mt-2'>
                                                    <button
                                                        className='rounded-md border p-1'
                                                        onClick={()=>
                                                            updateQuantity(item.id, item.quantity - 1)
                                                        }
                                                    >
                                                        <Minus className='h-4 w-4' />
                                                    </button>
                                                    <span className="mx-2 w-8 text-center"></span>
                                                    <button
                                                        className='rounded-md border p-1'
                                                        onClick={()=>
                                                            updateQuantity(item.id, item.quantity + 1)
                                                        }
                                                    >
                                                        <Plus className='h-4 w-4' />
                                                    </button>
                                                    <button  
                                                        onClick={()=> removeFromCart(item.id)}
                                                        className='ml-auto text-gray-400 hover:text-gray-500'
                                                    >
                                                        <X className='h-5 w-5' />
                                                        <span className='sr-only'>Remove</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className='border-t border-gray-200 py-6'>
                                <div className='flex justify-between text-base font-medium text-gray-900 mb-4'>
                                    <p>Subtotal</p>
                                    <p>${cartTotal}</p>
                                </div>
                                {/* WIP checkout */}
                            </div>
                        </div>)}
                    </SheetContent>
                </Sheet>
            </div>
        </header>
        <main className='container mx-auto px-4 py-8'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-40'>
                {products.map((product, index)=> (
                    <Link 
                        href={`/product/${product.id}`}
                        key={index}
                        className='flex flex-col group relative'
                    >
                        <div className='aspect-square rounded-md overflow-hidden'>
                            <Image src={'/placeholder.svg'} alt={product.name} width={300} height={300} className='w-full h-full object-contain'/>

                        </div>

                    </Link>
                ))}
            </div>
        </main>
    </div>
  )
}

export default ProductGrid