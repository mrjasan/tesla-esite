import { Skeleton } from "@/app/components/ui/skeleton"
 
export function Loading() {
  return (
    <div className="flex flex-grow items-center space-x-4 w-full h-full justify-center">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}