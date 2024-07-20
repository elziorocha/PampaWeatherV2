"use client"
import { useGlobalContext } from '@/app/contexts/GlobalContext'
import { sun } from '@/app/utils/Icons'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'
import { UvProgress } from '../UvProgress/UvProgress'

const UvIndex = () => {

    const { uvIndex } = useGlobalContext();

    if (!uvIndex || !uvIndex.daily) {
        return <Skeleton className="h-48 w-full" />;
    }

    const { daily } = uvIndex;
    const { uv_index_clear_sky_max, uv_index_max } = daily;

    const uvIndexMax = uv_index_max[0].toFixed(0);

    const uvIndexCategory = (uvIndex: number) => {
        if (uvIndex <= 2) {
            return {
                text: "Low",
                protection: "No protection required",
            };
        } else if (uvIndex <= 5) {
            return {
                text: "Moderate",
                protection: "Stay in shade near midday.",
            };
        } else if (uvIndex <= 7) {
            return {
                text: "High",
                protection: "Wear a hat and sunglasses.",
            };
        } else if (uvIndex <= 10) {
            return {
                text: "Very High",
                protection: "Apply sunscreen SPF 30+ every 2 hours.",
            };
        } else if (uvIndex > 10) {
            return {
                text: "Extreme",
                protection: "Avoid being outside.",
            };
        } else {
            return {
                text: "Extreme",
                protection: "Avoid being outside.",
            };
        }
    };

    const marginLeftPercentage = (uvIndexMax / 14) * 100;

    return (
        <div className="flex h-48 flex-col gap-2 rounded-lg border px-4 py-3 shadow-sm dark:bg-dark-grey
        dark:shadow-none">
            <div className='flex justify-center'>
                <h2 className="flex items-center gap-1 text-lg font-medium">{sun}Uv Index</h2>
            </div>
            <div className="flex flex-col gap-1 pt-2">
                <p className="text-2xl font-medium">
                    {uvIndexMax}
                    <span className="ml-1.5 text-sm">
                        ({uvIndexCategory(uvIndexMax).text})
                    </span>
                </p>

                <UvProgress
                    value={marginLeftPercentage}
                    max={14}
                    className="progress"
                />
            </div>

            <p className="mt-3 text-center text-sm italic">{uvIndexCategory(uvIndexMax).protection} </p>
        </div>
    )
}

export default UvIndex