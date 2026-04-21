'use client'

import { useState } from "react"
import NextImage from 'next/image'

type Props = {
    src: string[],
    alt: string,
    className?: string,
    width: number,
    height: number
}

export default function Image({ src, alt, className, width, height }: Props) {
    const [index, setIndex] = useState(0)

    function handleError() {
        setIndex((prev) => (prev < src.length - 1 ? prev + 1 : prev))
    }

    return (
        <NextImage 
            src={src[index]}
            alt={alt}
            width={width}
            height={height}
            className={className}
            onError={handleError}
            unoptimized
        />
    )
}