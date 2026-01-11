import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const ProductCardSkeleton = () => {
    return (
        <div>
            <Card>
                <CardHeader className="flex-shrink-0">
                    <CardTitle className="flex justify-center">
                        <Skeleton className="h-6 w-32" />
                    </CardTitle>
                    <div className="flex justify-center">
                        <Skeleton className="w-48 h-48 rounded-md" />
                    </div>
                </CardHeader>
                <CardDescription className="text-sm text-gray-500 flex justify-center">
                    <Skeleton className="h-4 w-40" />
                </CardDescription>

                <CardFooter className="flex items-center justify-center">
                    <Skeleton className="h-10 w-24 rounded-md" />
                </CardFooter>
                <div className="flex justify-center pb-4">
                    <Skeleton className="h-4 w-32" />
                </div>
            </Card>
        </div>
    )
}

export default ProductCardSkeleton
