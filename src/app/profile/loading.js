"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Loader2 } from "lucide-react"

export default function CreativeProfileLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 to-rose-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-red-400 to-rose-500 h-32 flex items-center justify-center">
          <Loader2 className="w-12 h-12 text-white animate-spin" />
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Skeleton className="h-20 w-20 rounded-full bg-red-200" />
              <div className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-rose-400 border-2 border-white"></div>
            </div>
            <div className="space-y-2 flex-1">
              <Skeleton className="h-6 w-3/4 bg-red-200" />
              <Skeleton className="h-4 w-1/2 bg-rose-200" />
            </div>
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-full bg-red-100" />
            <Skeleton className="h-4 w-full bg-red-100" />
            <Skeleton className="h-4 w-3/4 bg-red-100" />
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-20 w-full bg-rose-100 rounded" />
                <Skeleton className="h-4 w-3/4 mx-auto bg-red-100" />
              </div>
            ))}
          </div>

          <div className="flex space-x-2">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-8 w-8 rounded-full bg-gradient-to-br from-red-300 to-rose-300" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}