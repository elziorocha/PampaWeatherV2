"use client"

import { useGlobalContext } from '@/app/contexts/GlobalContext'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const AirPollution = () => {

    const { airQuality } = useGlobalContext()

    if (!airQuality || !airQuality.list || airQuality.list[0] || airQuality.list[0].main) {
        return <Skeleton className='col-span-2 h-48 w-full md:col-span-full' />
    }

    return (
        <div className='sm-2:col-span-2 col-span-full flex h-48 flex-col gap-8 rounded-lg border px-4
        pt-6 shadow-sm dark:bg-dark-grey dark:shadow-none'>
            AirPollution
        </div>
    )
}

export default AirPollution