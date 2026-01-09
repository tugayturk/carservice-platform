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
import registerUser from "@/actions/register"
import startSession from "@/lib/session"
import { useRouter } from "next/navigation"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "sonner"

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Invalid email address.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
})

const RegisterPage = () => {

    const{ loader,setLoader } = useAuthStore()
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
    })
    const onSubmit =(values: z.infer<typeof formSchema>) =>{
        setLoader(true)
       
        registerUser(values.username, values.email, values.password).then((res) => {
            startSession(res.user,res.jwt)
            setLoader(false)
            toast.success("Register Successfully")
            router.push("/")
        }).catch((err) => {
            toast.error("Register Failed")
            console.log(err)
        }).finally(() => {
            setLoader(false)
        })
       
    }


    return (
        <div className="w-1/2 border-2 border-white-500 p-3">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="user" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

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
                     {loader ? <Spinner/> : <Button className="w-full" type="submit">Register</Button> }
                    
                </form>
            </Form>
        </div>
    )
}

export default RegisterPage