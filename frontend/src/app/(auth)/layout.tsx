import Logo from "@/components/Logo/logo"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen w-2/3 mx-auto 
    flex flex-col items-center justify-center p-4">
      <Logo width={120} height={120} />
      {children}
    </div>
  )
}
