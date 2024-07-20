"use client"
import { useGlobalContext } from '@/app/contexts/GlobalContext';
import { wind } from '@/app/utils/Icons';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import React from 'react'

const Wind = () => {

    const { forecast } = useGlobalContext();

    const windSpeed = forecast?.wind?.speed;
    const windDir = forecast?.wind?.deg;

    if (!windSpeed || !windDir) {
        return <Skeleton className="h-48 w-full" />;
    }

    return (
        <div className="flex h-48 flex-col items-center gap-2 rounded-lg border px-4 pt-3 shadow-sm
        dark:bg-dark-grey dark:shadow-none">
            <h2 className="flex items-center gap-2 text-lg font-medium">{wind} Wind</h2>

            <div className="relative flex items-center justify-center">
                <div className="relative">
                    <Image
                        src="/compass_body.svg"
                        alt="compass"
                        width={110}
                        height={110}
                        className='p-0.5'
                    />
                    <Image
                        src="/compass_arrow.svg"
                        alt="compass"
                        className="absolute -top-1 left-1/2 -ml-px transition-all duration-500 ease-in-out dark:invert"
                        style={{
                            transform: `rotate(${windDir}deg) translateX(50%)`,
                            height: "100%",
                        }}
                        width={11}
                        height={11}
                    />
                </div>

                <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm
                font-medium dark:text-white">
                    {Math.round(windSpeed)} m/s
                </p>
            </div>
        </div>
    )
}

export default Wind