"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Payment from "@/components/payment/payment"
import { useEffect, useState } from "react"
import GetCarts from "@/actions/getCart"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
  address: z.string().min(10, {
    message: "Address must be at least 10 characters.",
  }),
  holderName: z.string().min(2, {
    message: "Holder name must be at least 2 characters.",
  }),
  cardNumber: z.string().min(16, {
    message: "Card number must be at least 16 characters.",
  }),
  expirationMonth: z.string().min(2, {
    message: "Expiration month must be at least 5 characters.",
  }),
  expirationYear: z.string().min(2, {
    message: "Expiration year must be at least 5 characters.",
  }),
  cvc: z.string().min(3, {
    message: "CVC must be at least 3 characters.",
  }),
})
type FormValues = z.infer<typeof formSchema>

function CheckoutPage() {
  const [carts, setCarts] = useState<any>([])
  const [response, setResponse] = useState<any>(null)

  const getCarts = async () => {
    const data = await GetCarts()
    setCarts(data.data)
  }

  useEffect(() => {
    getCarts()
  }, [])

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "Tugay Türk",
      phone: "0537 777 11 22",
      address: "İstanbul, Türkiye",
      holderName: "Tugay Türk",
      cardNumber: "5890040000000016",
      expirationMonth: "12",
      expirationYear: "2027",
      cvc: "123",
    },
  })

  const onSubmit = async (data: FormValues) => {

      //hata üretene card number 4111111111111129

    const paymentCard = {
      cardHolderName: data.holderName,
      cardNumber: data.cardNumber,
      expireMonth: data.expirationMonth,
      expireYear: data.expirationYear,
      cvc: data.cvc,
      registerCard: "0",
    }
    const buyer = {
      id: "1234567890",
      name: "Tugay",
      surname: "Türk",
      gsmNumber: data.phone,
      email: "tugay@tugay.com",
      identityNumber: "12345678901",
      lastLoginDate: "2015-10-05 12:43:35",
      registrationDate: "2025-04-21 15:30:00",
      registrationAddress: data.address,
      ip: "85.34.78.112",
      city: "İstanbul",
      country: "Türkiye",
      zipCode: "34000",
    }
    const shippingAddress = {
      contactName: data.name,
      city: "İstanbul",
      country: "Türkiye",
      address: data.address,
      zipCode: "34000",
    }
    const billingAddress = {
      contactName: data.name,
      city: "İstanbul",
      country: "Türkiye",
      address: data.address,
      zipCode: "34000",
    }
    // Flatten cart_items from all carts for basket items
    const basketItems = carts.flatMap((cart: any) => 
      (cart.cart_items || []).map((item: any) => ({
        id: item.product?.id || item.id,
        name: item.product?.name || 'Ürün',
        quantity: item.quantity,
        price: item.price,
        itemType: "PHYSICAL",
        category1: "1",
      }))
    )

    // Calculate total from cart_items
    const calculateTotal = () => {
      return carts.reduce((acc: number, cart: any) => {
        const cartItemsTotal = (cart.cart_items || []).reduce((itemAcc: number, item: any) => {
          return itemAcc + (item.price || 0)
        }, 0)
        return acc + cartItemsTotal
      }, 0)
    }

    const totalPrice = calculateTotal()

    const paymentData = {
      price: totalPrice,
      paidPrice: totalPrice,
      currency: "TRY",
      basketId: "1234567890",
      paymentCard: paymentCard,
      buyer: buyer,
      shippingAddress: shippingAddress,
      billingAddress: billingAddress,
      basketItems: basketItems,
    }
    try {
      const response = await axios.post("http://localhost:3002/api/payment", paymentData, {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      )
      setResponse(response.data)
      if(response.data.status === "success"){
        toast.success("Ödeme başarılı")
      } else {
        toast.error(response.data.errorMessage)
      }
    } catch (error) {
      console.log(error)
    }

  }



  return (
    <div className="w-full flex flex-row ">
      <div className="w-2/3 ml-2  border-2 border-white-500 p-3 ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Tugay Türk" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="0537 777 11 22" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"

              render={({ field }) => (
                <FormItem className="col-span-2 border-b-2 border-gray-500 pb-4">
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="İstanbul, Türkiye" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="holderName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Holder Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Tugay Türk" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Number</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="5890040000000016" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expirationMonth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiration Month</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="12" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expirationYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiration Year</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="2027" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cvc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CVC</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="123" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="col-span-2 flex justify-center mt-2">
              <Button className="w-1/4 col-span-2" type="submit">Satın Al</Button>
            </div>
          </form>
        </Form>
      </div>

      <div className="w-1/3 h-1/2 flex justify-center p-3">
        <Payment carts={carts} isCheckout={true} />
      </div>

      <ToastContainer />

    </div>
  );
}

export default CheckoutPage;