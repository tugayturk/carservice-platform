import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import Link from 'next/link'
import { Button } from "../ui/button"


const Payment = ({ carts, isCheckout }: { carts: any, isCheckout: boolean }) => {
  // Calculate total from cart_items
  const calculateTotal = () => {
    return carts.reduce((acc: number, cart: any) => {
      const cartItemsTotal = (cart.cart_items || []).reduce((itemAcc: number, item: any) => {
        return itemAcc + (item.price || 0)
      }, 0)
      return acc + cartItemsTotal
    }, 0)
  }

  const subtotal = calculateTotal()
  const total = subtotal + 100

  return (
    <Card className="w-full max-w-sm">
    <CardHeader>
      <CardTitle>Sepet Özeti</CardTitle>
     
    </CardHeader>
    <CardContent>
      <div className="flex flex-row justify-between text-sm">
        <span>Ara Toplam</span> 
        <div>{subtotal} TL</div>
        </div>
    </CardContent>
    <CardContent className='border-b-2 border-gray-200 py-1'>
      <div className="flex flex-row justify-between text-sm">
        <span>Kargo Ücreti</span> 
        <div>100 TL</div>
        </div>
    </CardContent>
    <CardContent >
      <div className="flex flex-row justify-between text-sm">
        <span>Toplam Tutar</span> 
        <div>{total} TL</div>
        </div>
    </CardContent>
    <CardFooter className="flex-col gap-2">
     {isCheckout ? null : <Button type="submit" className="w-full">
        <Link href="/checkout"> Satın Al</Link>
       </Button>}
  
    </CardFooter>
  </Card>
  )
}

export default Payment