'use client'
import { usePathname } from "next/navigation"
import Sidebar from "../../components/navbar/sidebar"
import { NextUIProvider } from "@nextui-org/system";

const Layout = ({children}: any) => {
    const pathname = usePathname();
    console.log(pathname)
    const isEditPage = pathname.includes('/edit');
console.log(isEditPage, 'isEditPage')
  return (
    <>
        

        {!isEditPage && 'd'}

        <div >
            <div className="p-4 mt-14">
                {children}
            </div>
        </div>
    </>
  )
}

export default Layout