import { ClipLoader } from "react-spinners"

export const SucessBox = ({content}) => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-full max-w-2xl p-4 bg-gray-200 shadow-lg sm:p-10 rounded-3xl mx-6">
                <div className="text-center">
                    <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-green-200 rounded-full">
                        <svg className="h-12 w-12 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path>
                        </svg>
                    </div>
                    <h1 className="text-4xl font-extrabold text-green-400">{content.title}</h1>
                    <p className="mt-4 text-lg text-green-400 font-bold">
                        {content.subtitle}
                    </p>
                    
                </div>
                <div className="mt-2 text-center">
                    <ClipLoader size={40} color="black"/>
                    <h1 className="text-green-400 mt-2 font-semibold">{content.message}</h1>
                </div>
            </div>
        </div>
    )
}