"use client"
import { useGlobalContext } from '@/app/contexts/GlobalContext'
import { thermometer } from '@/app/utils/Icons'
import { Skeleton } from '@/components/ui/skeleton'
import { kelvinToCelsius } from "@/app/utils/misc"
import React from 'react'

const FeelsLike = () => {

    const { forecast } = useGlobalContext()

    if (!forecast || !forecast?.main || !forecast?.main?.feels_like) {
        return <Skeleton className="h-48 w-full" />
    }

    const { feels_like, temp_min, temp_max } = forecast?.main

    const feelsLikeText = (
        feelsLike: number,
        minTemo: number,
        maxTemp: number
    ) => {
        const avgTemp = (minTemo + maxTemp) / 2;

        if (feelsLike < avgTemp - 5) {
            return "Feels significantly colder than actual temperature."
        }
        if (feelsLike > avgTemp - 5 && feelsLike <= avgTemp + 5) {
            return "Feels close to the actual temperature."
        }
        if (feelsLike > avgTemp + 5) {
            return "Feels significantly warmer than actual temperature."
        }

        return "Temperature feeling is typical for this range."
    }

    const feelsLikeDescription = feelsLikeText(feels_like, temp_min, temp_max)

    return (
        <div className="flex h-48 flex-col items-center gap-2 rounded-lg border p-3 shadow-sm dark:bg-dark-grey
        dark:shadow-none">
            <h2 className="flex items-center gap-1 text-lg font-medium">{thermometer}Feels Like</h2>
            <p className='pt-4 text-4xl font-medium'>{kelvinToCelsius(feels_like)}°C</p>

            <p className="pt-4 text-center text-sm italic">{feelsLikeDescription}</p>
        </div>
    )
}

export default FeelsLike