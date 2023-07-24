'use client'

import Image from "next/image"

function Logo() {
    return(
        <Image className="hidden md:block cursor-pointer" alt="Logo" height="160" width="160" src="/images/logo.png" />
    )
}

export default Logo