import Link from 'next/link'
import { Input } from "@/components/ui/input"
import {
    UserIcon,
    ShoppingCart,
    SearchIcon
  } from "lucide-react"
  import { ModeToggle } from "@/components/ModeToggle"
  import Image from "next/image";


  const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full h-24 z-50 border-b-2 bg-gray-200 dark:bg-gray-900 overflow-visible">
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
        <UserIcon />
        <ShoppingCart  />
        <ModeToggle/>
        </div>
      </div>
    </header>
  )
}

export default Header