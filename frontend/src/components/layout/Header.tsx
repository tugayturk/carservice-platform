"use client"
import Link from 'next/link'
import { Input } from "@/components/ui/input"
import {
  UserIcon,
  ShoppingCart,
  SearchIcon
} from "lucide-react"
import { ModeToggle } from "@/components/ModeToggle"
import Image from "next/image";
import UserMenu from '../Menu/UserMenu'
import { useEffect, useState } from 'react';
import { getCategories } from '@/lib/api';
import { Category } from '@/types'
import useCartQuantityStore from '@/hooks/useCartQuantity'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form"
import { useRouter } from 'next/navigation'
import useAuthStore from '@/hooks/useAuth'


const searchSchema = z.object({
  search: z.string().min(1),
});

type SearchFormValues = z.infer<typeof searchSchema>; // form values type

const Header = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [username, setUsername] = useState<string | null>(null);
  const { cartQuantity } = useCartQuantityStore()
  const router = useRouter();
  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: "",
    },
  })

  const onSubmit = (values: SearchFormValues) => {
      if(values) {
        router.push(`/search?search=${values.search}`);
  }
}

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data.data);
    });

    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      setUsername(user.username);
    }
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full h-28 z-50 border-b-2 bg-gray-200 dark:bg-gray-900 overflow-visible">
      <div className="container mx-auto px-4 py-1 flex items-center justify-between overflow-visible border-b-2 border-gray-300 dark:border-gray-700">

        <div>
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Site Logo"
              width={60}
              height={60}
              priority
              className='mb-1'
            />
          </Link>
        </div>
        
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} >
              <FormField
                control={form.control}
                name="search"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                    <div className="relative w-2/3 max-w-md ml-40">
                      <Input {...field} type="search" placeholder="Search" className="pr-10 w-full focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-input bg-white" />
                      <SearchIcon className='absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 z-10 cursor-pointer' />  
                       </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>

        <div className="flex items-center gap-2 w-1/4 justify-end ">
          <UserMenu username={username as string} />
          <Link href="/cart" className='relative cursor-pointer bg-white px-3 py-2 rounded-md'>
            <ShoppingCart className="w-4 h-4 dark:text-black" />
            {cartQuantity > 0 && (
              <span className='absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center'>
                {cartQuantity}
              </span>
            )}
          </Link>

          <ModeToggle />
        </div>
      </div>

      <div className="flex items-center text-sm py-1 gap-4 w-full justify-center">
        {categories?.map((category: any) => (
          <Link href={`/products/category/${category.name.toLowerCase()}`} key={category.id}
            className='cursor-pointer bg-white px-3 py-1 rounded-md dark:text-black'>
            {category.name}
          </Link>
        ))}
      </div>


    </header>
  )
}

export default Header