"use client"

import { useGlobalContext } from '@/app/contexts/GlobalContext'
import { thermo } from '@/app/utils/Icons'
import { airQulaityIndexText } from '@/app/utils/misc'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const AirPollution = () => {

    const { airQuality } = useGlobalContext()

    if (
        !airQuality ||
        !airQuality.list ||
        !airQuality.list[0] ||
        !airQuality.list[0].main
    ) {
        return (
            <Skeleton className="col-span-2 h-48 w-full md:col-span-full" />
        );
    }

    const airQualityIndex = airQuality.list[0].main.aqi * 10;

    const filteredIndex = airQulaityIndexText.find((item) => {
        return item.rating === airQualityIndex
    })

    return (
        <div className='sm-2:col-span-2 col-span-full flex h-48 flex-col gap-8 rounded-lg border px-4
        pt-6 shadow-sm dark:bg-dark-grey dark:shadow-none'>
            <h2 className='flex items-center gap-2 font-medium'>
                {thermo}Air Pollution
            </h2>
            <Progress value={airQualityIndex} max={100} className="progress" />
            <p className="text-sm">Air quality is {filteredIndex?.description}.</p>
        </div>
    )
}

export default AirPollution