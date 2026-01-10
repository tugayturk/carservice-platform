"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { getSliderImages } from "@/lib/api"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function Home() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const [sliderImages, setSliderImages] = useState<any>([])
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = window.localStorage.getItem("user")
      if (userData) {
        try {
          setUser(JSON.parse(userData))
          getSliderImages().then((data) => {
            setSliderImages(data.data)
            console.log(data.data)
          }).catch((error) => {
            console.error("Error fetching slider images:", error)
          })
        } catch (error) {
          console.error("Error parsing user data:", error)
          setUser(null)
        }
      }
      else{
        router.push("/login")
      }
    }
  }, [])

  return (
    <div className="max-w-2xl mx-auto">
    <Carousel >
    <CarouselContent>
      {sliderImages
        .map((sliderImage: any, index: number) => (
          <CarouselItem key={index}>
            <div>
              <Card>
              <p className="text-center">
                 {sliderImage.description}
                </p>
                <CardContent className="flex items-center justify-center p-0">
                  <div className="relative w-full h-64 md:h-72 lg:h-80">
                    <Image 
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${sliderImage.image.url}`}
                      alt={sliderImage.description || 'Slider image'} 
                      fill
                      className="object-cover w-full"
                      unoptimized
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>

  <Button className="mt-4 mx-auto block">
    <Link href="/products">
      Ürünleri Gör
    </Link>
  </Button>
  </div>
  );  
}
