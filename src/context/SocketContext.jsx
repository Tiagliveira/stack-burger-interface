import { createContext, useContext, useEffect, useState } from "react"
import { io } from "socket.io-client"

const apiUrl = import.meta.env.VITE_API_URL;

const SocketContext = createContext()

export const useSocket = () => {
    return useContext(SocketContext)
}

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null)

    useEffect(() => {
        const newSocket = io(apiUrl, {
            withCredentials: true,
            autoConnect: true,
        })
        setSocket(newSocket)

        return () => newSocket.disconnect();
    }, [])

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    )
}