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
import Payment from '@/components/payment/payment'

const CartPage = () => {
  const [carts, setCarts] = useState<any>([])
  const { cartQuantity, setCartQuantity } = useCartQuantityStore()
  const { jwt } = useAuthStore()

  const getCarts = async () => {
    const data = await GetCarts()
    setCarts(data.data)
    // Calculate total cart_items count across all carts
    const totalItems = data.data.reduce((acc: number, cart: any) => {
      return acc + (cart.cart_items?.length || 0)
    }, 0)
    setCartQuantity(totalItems)
  }

  useEffect(() => {
    getCarts()
  }, [])

  const handleRemoveFromCart = (id: string) => {
    DeleteToCart(id, jwt).then((data: any) => {
      getCarts()
    })
  }

  // Flatten cart_items from all carts for display
  const allCartItems = carts.flatMap((cart: any) => 
    (cart.cart_items || []).map((item: any) => ({
      ...item,
      cartId: cart.id,
      cartDocumentId: cart.documentId
    }))
  )

  return (
    <div className='container mx-auto px-4 py-4 flex flex-row gap-4'>
      <div className="flex-1 w-3/4">
        {allCartItems.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            Sepetiniz boş
          </div>
        ) : (
          allCartItems.map((cartItem: any) => (
            <Item key={cartItem.id} className='mb-4' variant="outline">
              <ItemContent>
                <ItemTitle>{cartItem.product?.name || 'Ürün adı yok'}</ItemTitle>
                <ItemDescription>
                  <div className="space-y-1">
                    <div>Miktar: {cartItem.quantity}</div>
                    <div>Birim Fiyat: {cartItem.product?.price || 0} TL</div>
                    {cartItem.product?.description && (
                      <div className="text-sm text-muted-foreground">{cartItem.product.description}</div>
                    )}
                  </div>
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      {cartItem.price} TL
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Sepetten Çıkarmak mı istiyorsunuz?</AlertDialogTitle>
                      <AlertDialogDescription>
                        {cartItem.product?.name} ürününü sepetten çıkarmak istediğinize emin misiniz?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Hayır</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleRemoveFromCart(cartItem.documentId)}>Evet</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </ItemActions>
            </Item>
          ))
        )}
      </div>

      <div className="w-1/4"  >
        <Payment carts={carts} isCheckout={false} />
      </div>

    </div>
  )
}

export default CartPage