import { useEffect, useState } from "react";
import { MdNavigateBefore } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";

export const Crousel = ({children: slides}) => {
    
    const [curr, setCurr] = useState(0)
    const prev = () => setCurr(curr => curr === 0 ? slides.length - 1 : curr - 1)
    const next = () => setCurr(curr => curr === slides.length - 1 ? 0 : curr + 1)
    const slide = slides.map(slide => slide)
    useEffect(() => {
        const slideInterval = setInterval(next, 6000)
        return () => clearInterval(slideInterval)
    }, [])

    return(
        <div className="overflow-hidden relative">
            <div className="flex transition-transform ease-out duration-500" style={{ transform: `translateX(-${curr * 100}%)` }}>
                <div className="flex">
                    {slide}
                </div>
            </div>
                <button onClick={prev} className="absolute top-[48%] left-5 p-1 z-40 rounded-full bg-white/80 shadow text-gray-800 hover:bg-white">
                    <MdNavigateBefore size={30}/>
                </button>
                <button onClick={next} className="absolute top-[48%] right-5 p-1 rounded-full bg-white/80 shadow text-gray-800 hover:bg-white">
                    <MdNavigateNext size={30}/>
                </button>
            <div className="absolute bottom-4 right-0 left-0">
                <div className="flex items-center justify-center gap-2">
                    {slides.map((_, i) => (
                        <div
                        key={i}
                        onClick={() => setCurr(i)}
                        className={`
                        transition-all w-3 h-3 bg-neutral-800 rounded-full
                        ${curr === i ? "p-4" : "bg-opacity-50"}
                        `}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}