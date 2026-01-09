"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import useAuthStore from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import startSession from "@/lib/session"
import loginUser from "@/actions/login"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "sonner"

const formSchema = z.object({
    email: z.string().email({
        message: "Invalid email address.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
})

const LoginPage = () => {

    const{ loader,jwt,setLoader,setJwt } = useAuthStore()
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })
    const onSubmit =(values: z.infer<typeof formSchema>) =>{
      
        setLoader(true)
        loginUser(values.email, values.password).then((res) => {
            console.log(res)
            startSession(res.user,res.jwt)
            setLoader(false)
            toast.success("Login Successfully")
            router.push("/")
        }).catch((err) => {
            toast.error("Login Failed")
            console.log(err)
        }).finally(() => {
            setLoader(false)
        })
     
    }

  return (
    <div className="w-1/2  border-2 border-white-500 p-3">
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input placeholder="user@example.com" {...field} />
                        </FormControl>
                        <FormDescription>
                            This is your email address.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input type="password" placeholder="********" {...field} />
                        </FormControl>
                        <FormDescription>
                            This is your password.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
            {loader ? <Spinner/> : <Button className="w-full" type="submit">Login</Button> }
        </form>
    </Form>
</div>
  )
}

export default LoginPage