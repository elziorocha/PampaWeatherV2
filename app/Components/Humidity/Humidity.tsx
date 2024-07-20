"use client"

import { useGlobalContext } from '@/app/contexts/GlobalContext'
import { droplets } from '@/app/utils/Icons'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const Humidity = () => {

    const { forecast } = useGlobalContext()

    const getHumidityText = (humidity: number) => {
        if (humidity < 30) return "Dry: May cause skin irritation"

        if (humidity >= 30 && humidity < 50) return "Comfortable: Ideal for health and comfort"

        if (humidity >= 50 && humidity < 70) return "Moderate: Sticky, may increase allergens"

        if (humidity >= 70) return "High: Uncomfortable, mold growth risk"

        if (!humidity) return "Unavailable: Humidity data not available"
    };

    if (!forecast || !forecast?.main || !forecast?.main?.humidity) {
        return <Skeleton className="h-48 w-full" />
    }

    const { humidity } = forecast?.main;

    return (
        <div className="flex h-48 flex-col items-center gap-2 rounded-lg border p-3 shadow-sm dark:bg-dark-grey
        dark:shadow-none">
            <h2 className="flex items-center gap-1.5 text-lg font-medium">{droplets}Humidity</h2>
            <p className="pt-5 text-3xl font-medium">{humidity}%</p>

            <p className="pt-3 text-center text-sm italic">{getHumidityText(humidity)}.</p>
        </div>
    )
}

export default Humidity