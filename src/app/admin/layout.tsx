'use client'
import { usePathname } from "next/navigation"
import Sidebar from "./components/navbar/sidebar"
import { NextUIProvider } from "@nextui-org/system";

const Layout = ({children}: any) => {
    const pathname = usePathname();
  return (
    <>
        

        {pathname !=='/admin/login' && <Sidebar/>}

        <div className={pathname !=='/admin/login' ? "sm:ml-64":''}>
            <div className="p-4 mt-14">
            <NextUIProvider>
                {children}
                </NextUIProvider>
            </div>
        </div>
    </>
  )
}

export default Layout
