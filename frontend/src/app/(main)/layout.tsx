import Header from "@/components/layout/Header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main className="pt-36 min-h-screen">
        {children}
      </main>
    </>
  )
}
