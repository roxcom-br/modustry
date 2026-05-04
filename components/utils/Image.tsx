'use client'

import { useState } from "react"
import NextImage from 'next/image'

type Props = {
    src: string[],
    alt: string,
    className?: string,
    width: number,
    height: number,
    blurPlaceholder?: string
}

export default function Image({ src, alt, className, width, height, blurPlaceholder }: Props) {
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
            placeholder={blurPlaceholder ? "blur" : "empty"}
            blurDataURL={blurPlaceholder}
        />
    )
}