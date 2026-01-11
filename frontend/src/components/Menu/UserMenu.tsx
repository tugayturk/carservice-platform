"use client"
import {
    UserIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import useAuthStore from "@/hooks/useAuth"
import { useEffect } from "react"

const UserMenu = ({ username }: { username: string }) => {
    const router = useRouter()
    const { jwt, setJwt } = useAuthStore()

    useEffect(() => {
        if (typeof window !== "undefined") {
            const user = localStorage.getItem("user")
            const jwt = localStorage.getItem("jwt")
            if (jwt && user) {
                const userData = JSON.parse(user)
                setJwt(jwt)
            }

        }
    }, [])

    const signOut = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("user")
            localStorage.removeItem("jwt")
            setJwt("")
            router.push("/login")
        }
    }

    return (
        <div>
            {jwt ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" >
                            <UserIcon />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="start">
                        <DropdownMenuLabel>{username.charAt(0).toUpperCase() + username.slice(1)}</DropdownMenuLabel>
                        <DropdownMenuItem>
                            Profile
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => signOut()}>
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>) : (<UserIcon/>)}
        </div>
    )
}

export default UserMenu