import { ScaleLoader } from "react-spinners"

export const Loader = () => {
    return (
        <div className="h-screen flex flex-col justify-center items-center space-y-5">
            <ScaleLoader color="#171717" size={40} speedMultiplier={1}/>
            <h1 className="text-neutral-900 text-xl font-bold font-poppins">Loading...</h1>
        </div>
    )
}