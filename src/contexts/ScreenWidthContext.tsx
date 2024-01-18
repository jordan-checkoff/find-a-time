
import { Context, createContext, useContext, useEffect, useState } from "react";


const ScreenWidthContext = createContext(0)

export default function ScreenWidthProvider({children}: any) {

    const [screenWidth, setScreenWidth] = useState(0)

    const handleResize = () => {
        setScreenWidth(window.innerWidth)
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => window.addEventListener('resize', handleResize);
    }, [])

    return (
        <ScreenWidthContext.Provider value={screenWidth}>
            {children}
        </ScreenWidthContext.Provider>
    )
}

export const useScreenWidth = () => {
    return useContext(ScreenWidthContext)
}