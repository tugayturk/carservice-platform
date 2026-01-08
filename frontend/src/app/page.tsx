import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
  <span className="text-2xl font-bold">  özrenotek2</span>

    <div className="flex flex-wrap items-center gap-2 md:flex-row">
      <Button variant="destructive">Button</Button>
     
    </div>
    </div>
  );
}
