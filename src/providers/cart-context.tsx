import React, { createContext, useCallback, useState } from 'react'


type Props = {
  children: React.ReactNode
}

interface CartItem{
  id: string
  name: string
  price: number
  quantity: number
  image: {
    src: string
  }[]
}

interface CartContextType{
  items: CartItem[]
  isOpen: boolean
  addProduct: (product: any) => void
  deleteProduct: (productId: string) => void
  updateProduct: (productId: string, quantity: number) => void
  setIsOpen: (isOpen: boolean)=> void
  clearCart: ()=> void
  cartTotal: number
}

export const CartContext = createContext<CartContextType | undefined>(undefined)

const CartProvider = ({children}: Props) => {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  
  const addProduct = useCallback((product: any)=>{
    setItems((prevItems)=>{
      const existingItems = prevItems.find((item)=> item.id === product.id)

      if (existingItems){
        return prevItems.map((item)=> item.id === product.id ? {...item, quantity: item.quantity + 1}: item)
      }
      return [...prevItems, {...product, quantity: 1}]
    })
    setIsOpen(true)
  }, [])

  const deleteProduct = useCallback((productId: string)=>{
    setItems((prevItems)=> prevItems.filter((item)=> item.id !== productId))
  }, [])

  const updateProduct = useCallback((productId: string, quantity: number)=>{
    if(quantity < 1){
      deleteProduct(productId);
      return
    }
    setItems((prevItems)=> prevItems.map((item)=> item.id === productId ? {...item, quantity} : item))
  }, [])

  const clearCart = useCallback(()=>{
    setItems([])
  }, [])

  const cartTotal = items.reduce((total, item)=> total + item.price * item.quantity, 0)

  return (
    <CartContext.Provider value={{items, addProduct, isOpen, setIsOpen, deleteProduct, updateProduct, clearCart, cartTotal}}>
      {children}
    </CartContext.Provider>
  )
  
}

export default CartProvider