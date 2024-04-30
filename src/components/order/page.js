"use client"
import React, { useEffect } from 'react'
import Sidebar from '../sidebar/sidebar'
import App from './order'
import { useRouter } from 'next/router'

const Order = () => {
    const router = useRouter()
    useEffect(() => {
        const token = localStorage.getItem("accessToken")
        if (!token) {
            router.push("/admin")
        }
    }, [])
    return (
        <div>
            <Sidebar />
            <App />
        </div>
    )
}

export default Order