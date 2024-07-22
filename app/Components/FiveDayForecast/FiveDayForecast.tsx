"use client"
import { useGlobalContext } from '@/app/contexts/GlobalContext'
import { calender } from '@/app/utils/Icons'
import { kelvinToCelsius, unixToDay } from '@/app/utils/misc'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const FiveDayForecast = () => {

    const { fiveDayForecast } = useGlobalContext()

    const { city, list } = fiveDayForecast

    if (!FiveDayForecast || !city || !list) {
        return <Skeleton className="h-48 w-full" />;
    }

    const processData = (
        dailyData: {
            main: { temp_min: number; temp_max: number };
            dt: number;
        }[]
    ) => {
        let minTemp = Number.MAX_VALUE;
        let maxTemp = Number.MIN_VALUE;

        dailyData.forEach(
            (day: { main: { temp_min: number; temp_max: number }; dt: number }) => {
                if (day.main.temp_min < minTemp) {
                    minTemp = day.main.temp_min;
                }
                if (day.main.temp_max > maxTemp) {
                    maxTemp = day.main.temp_max;
                }
            }
        );

        return {
            day: unixToDay(dailyData[0].dt),
            minTemp: kelvinToCelsius(minTemp),
            maxTemp: kelvinToCelsius(maxTemp),
        };
    };

    const dailyForecasts = [];

    for (let i = 0; i < 40; i += 8) {
        const dailyData = list.slice(i, i + 5);
        dailyForecasts.push(processData(dailyData));
    }

    return (
        <div className='flex flex-1 flex-col justify-between rounded-lg border px-4 py-3 shadow-sm
        dark:bg-dark-grey dark:shadow-none'>
            <h2 className='flex items-center gap-2 text-lg font-medium'>{calender} 5-Day Forecast for {city.name}</h2>

            <div className="pt-3">
                {dailyForecasts.map((day, i) => {
                    return (
                        <div
                            key={i}
                            className="flex flex-col justify-evenly border-b-2 py-4"
                        >
                            <p className="min-w-14 text-xl font-medium">{day.day}</p>

                            <div className="flex flex-1 items-center justify-between gap-4">
                                <p className="font-bold">{day.minTemp}°C</p>
                                <div className="temperature h-2 w-full flex-1 rounded-lg"></div>
                                <p className="font-bold">{day.maxTemp}°C</p>
                            </div>
                            
                            <p className="flex justify-between text-sm">
                                <span>(low)</span>
                                <span>(high)</span>
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default FiveDayForecast