"use client"
import { useGlobalContext } from '@/app/contexts/GlobalContext';
import { eye } from '@/app/utils/Icons';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'

const Visibility = () => {

    const { forecast } = useGlobalContext()

    if (!forecast || !forecast?.visibility) {
        return <Skeleton className="h-48 w-full" />
    }

    const { visibility } = forecast

    const getVisibilityDescription = (visibility: number) => {
        const visibilityInKm = Math.round(visibility / 1000)

        if (visibilityInKm > 10) return "Excellent: Clear and vast view"

        if (visibilityInKm > 5) return "Good: Easily navigable"

        if (visibilityInKm > 2) return "Moderate: Some limitations"

        if (visibilityInKm <= 2) return "Poor: Restricted and unclear"

        if(!visibility) return "Unavailable: Visibility data not available"
    };

    return (
        <div className="flex h-48 flex-col items-center gap-2 rounded-lg border p-3 shadow-sm dark:bg-dark-grey
        dark:shadow-none">
            <h2 className="flex items-center gap-1.5 text-lg font-medium">{eye}Visibility</h2>
            <p className="pt-5 text-3xl font-medium">{Math.round(visibility / 1000)} km</p>

            <p className="pt-3 text-center text-sm italic">{getVisibilityDescription(visibility)}.</p>
        </div>
    )
}

export default Visibility