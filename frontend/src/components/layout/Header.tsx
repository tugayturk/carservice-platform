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

const Header = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const { cartQuantity } = useCartQuantityStore()
 
  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data.data);
    });
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full h-32 z-50 border-b-2 bg-gray-200 dark:bg-gray-900 overflow-visible">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between overflow-visible">

        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Site Logo"
              width={60}
              height={40}
              priority
              className='mb-2'
            />
          </Link>
        </div>

        <div className="relative w-2/3 max-w-md">
          <Input type="email" placeholder="Search" className="pr-10 w-full focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-input bg-white" />
          <SearchIcon className='absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none z-10' />
        </div>

        <div className="flex items-center gap-2 w-1/4 justify-end ">
          <UserMenu />
          <Link href="/cart" className='relative cursor-pointer bg-white px-3 py-2 rounded-md'>
            <ShoppingCart className="w-4 h-4" /> 
            {cartQuantity > 0 && (
              <span className='absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center'>
                {cartQuantity}
              </span>
            )}
          </Link>

          <ModeToggle />
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 text-sm">
        {categories?.map((category:any) => (
          <Link href={`/porducts/${category.name.toLowerCase()}`} key={category.id} 
          className='cursor-pointer border-b-2 border-transparent hover:border-primary transition-all duration-300'>
              {category.name}
          </Link>
        ))}
      </div>


    </header>
  )
}

export default Header