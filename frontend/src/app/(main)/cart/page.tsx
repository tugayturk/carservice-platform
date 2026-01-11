"use client"
import GetCarts from '@/actions/getCart'
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item"
import useCartQuantityStore from '@/hooks/useCartQuantity'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import DeleteToCart from '@/actions/deleteToCart'
import useAuthStore from '@/hooks/useAuth'

const CartPage = () => {
  const [carts, setCarts] = useState<any>([])
  const { cartQuantity, setCartQuantity } = useCartQuantityStore()
  const { jwt } = useAuthStore()
 
  const getCarts = async () => {
    const data = await GetCarts()
    setCarts(data.data)
    setCartQuantity(data.data.length)
  }

  useEffect(() => {
    getCarts()
  }, [])

  const handleRemoveFromCart = (id: string) => {
    DeleteToCart(id, jwt).then((data: any) => {
      getCarts()
    })
  }


  return (
    <div className='container mx-auto px-4 py-4'>
      {carts.map((cart: any) => (
        <Item key={cart.id} className='mb-4' variant="outline">
          <ItemContent>
            <ItemTitle>{cart.name}</ItemTitle>
            <ItemDescription>

            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm">
                  {cart.amount}TL
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Sepetten Çıkarmak mı istiyorsunuz?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Sepetten çıkarmak istediğinize emin misiniz?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Hayır</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleRemoveFromCart(cart.documentId)}>Evet</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </ItemActions>
        </Item>
      ))}

    </div>
  )
}

export default CartPage