"use client"
import "jsvectormap/dist/css/jsvectormap.css"
import "flatpickr/dist/flatpickr.min.css"
import "@/css/satoshi.css"
import "@/css/style.css"
import React, { useEffect, useState } from "react"
import Loader from "@/components/common/Loader";
import { Toaster } from "sonner";

export default function RootLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  // const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, [])

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
        <Toaster position="top-center" richColors="true" />
          {loading ? <Loader /> : children}
        </div>
      </body>
    </html>
  )
}
