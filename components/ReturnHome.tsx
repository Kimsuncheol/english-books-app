import { faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'

function ReturnHome() {
    return (
        <>
            <Link href="/" className="flex items-center gap-2">
                <FontAwesomeIcon icon={faHome} />
                Home
            </Link>
        </>
    )
}

export default ReturnHome