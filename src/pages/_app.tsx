import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import '@fortawesome/fontawesome-free/css/fontawesome.min.css'
import '@fortawesome/fontawesome-free/css/brands.min.css'
import '@fortawesome/fontawesome-free/css/solid.min.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function App({ Component, pageProps }: AppProps) {
    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
        require('@/lib/inject.js')

        
    }, [])
    return (
        <>
            <Component {...pageProps} />
            <SpeedInsights />
        </>
    )
}
