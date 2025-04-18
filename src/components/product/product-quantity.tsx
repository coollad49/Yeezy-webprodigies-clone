import React from 'react'

type Props = {
    product: any
}

const ProductQuantity = ({product}: Props) => {
  return (
    <div className='flex items-center space-x-6 justify-center'>
        {[...Array(10)].map((_, i)=> (
            <span key={i+1}>{i+1}</span>
        ))}
    </div>
  )
}

export default ProductQuantity