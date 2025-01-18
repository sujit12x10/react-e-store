import { Header, Footer } from "../components/index"
import { Outlet } from "react-router-dom"

export const Layout = () => {
    return (
        <div className="bg-[#fff] -z-20 absolute w-full">
            <Header />
                <main className="min-h-[100vh]">
                    <Outlet />
                </main>
            <Footer />
        </div>
    )
}