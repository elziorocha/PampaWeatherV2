"use client"
import { useGlobalContext } from '@/app/contexts/GlobalContext'
import { gauge } from '@/app/utils/Icons'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const Pressure = () => {

    const { forecast } = useGlobalContext()

    if (!forecast || !forecast?.main || !forecast?.main?.pressure) {
        return <Skeleton className="h-48 w-full" />
    }

    const { pressure } = forecast?.main;

    const getPressureDescription = (pressure: number) => {
        if (pressure < 1000) return "Very low pressure"

        if (pressure >= 1000 && pressure < 1015)
            return "Low pressure. Expect weather changes."

        if (pressure >= 1015 && pressure < 1025)
            return "Normal pressure. Expect weather changes."

        if (pressure >= 1025 && pressure < 1040)
            return "High pressure. Expect weather changes."

        if (pressure >= 1040) return "Very high pressure. Expect weather changes."

        if (!pressure) return "Unavailable pressure data"
    };

    return (
        <div className="flex h-48 flex-col items-center gap-2 rounded-lg border p-3 shadow-sm dark:bg-dark-grey
        dark:shadow-none">
            <h2 className="flex items-center gap-1.5 text-lg font-medium">{gauge}Pressure</h2>
            <p className="pt-5 text-3xl font-medium">{pressure} hPa</p>

            <p className="pt-3 text-center text-sm italic">{getPressureDescription(pressure)}</p>
        </div>
    )
}

export default Pressure