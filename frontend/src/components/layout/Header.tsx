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
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import { getCategories } from '@/lib/api';
import { Category } from '@/types'

const Header = () => {
  const [categories, setCategories] = useState<Category[]>([]);
 
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
          <Button variant="outline" >
            <ShoppingCart className="w-4 h-4" />
          </Button>

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