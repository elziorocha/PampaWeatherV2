"use client"

import { useGlobalContext } from '@/app/contexts/GlobalContext'
import { Sunrise, sunset } from '@/app/utils/Icons'
import { unixToTime } from '@/app/utils/misc'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const Sunset = () => {

    const { forecast } = useGlobalContext()

    if (!forecast || !forecast?.sys || !forecast?.sys?.sunset) {
        return <Skeleton className="h-48 w-full" />;
    }

    const times = forecast?.sys?.sunset;
    const timezone = forecast?.timezone;

    const sunsetTime = unixToTime(times, timezone);
    const sunrise = unixToTime(forecast?.sys?.sunrise, timezone);

    return (
        <div className="flex h-48 flex-col items-center gap-2 rounded-lg border p-3 shadow-sm dark:bg-dark-grey
        dark:shadow-none">
            <h2 className="flex items-center gap-2 text-lg font-medium">{sunset}Sunset</h2>
            <p className="text-3xl font-semibold">{sunsetTime}</p>

            <hr className='w-10/12 rounded-full border-2 border-zinc-600'/>

            <h2 className="mt-0.5 flex gap-2 text-lg font-medium">{Sunrise}Sunrise</h2>
            <p className="text-3xl font-semibold">{sunrise}</p>
        </div>
    )
}

export default Sunset