"use client"
import { useGlobalContext } from '@/app/contexts/GlobalContext';
import { people } from '@/app/utils/Icons';
import { formatNumber } from "@/app/utils/misc"
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'

const Population = () => {

    const { fiveDayForecast } = useGlobalContext();
    const { city } = fiveDayForecast;

    if (!fiveDayForecast || !city) {
        return <Skeleton className="h-48 w-full" />;
    }

    return (
        <div className="flex h-48 flex-col items-center gap-2 rounded-lg border p-3 shadow-sm dark:bg-dark-grey
        dark:shadow-none">
            <h2 className="flex items-center gap-2 text-lg font-medium">{people} Population</h2>
            <p className="pt-5 text-3xl font-medium">{formatNumber(city.population)}</p>

            <p className="pt-3 text-center text-sm italic">Latest UN population data for {city.name}.</p>
        </div>
    )
}

export default Population