"use client"
import { useGlobalContext } from '@/app/contexts/GlobalContext'
import { clearSky, cloudy, drizzleIcon, mist, rain, snow } from '@/app/utils/Icons'
import { Skeleton } from '@/components/ui/skeleton'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import moment from "moment"
import { kelvinToCelsius } from "@/app/utils/misc"
import React from 'react'

const DailyForecast = () => {

    const { forecast, fiveDayForecast } = useGlobalContext();

    const { weather } = forecast;
    const { city, list } = fiveDayForecast;

    if (!fiveDayForecast || !city || !list) {
        return <Skeleton className="h-48 w-full" />;
    }

    if (!forecast || !weather) {
        return <Skeleton className="h-48 w-full" />;
    }

    const today = new Date();
    const todayString = today.toISOString().split("T")[0];

    const todaysForecast = list.filter(
        (forecast: { dt_txt: string; main: { temp: number } }) => {
            return forecast.dt_txt.startsWith(todayString);
        }
    );    

    const { main: weatherMain } = weather[0];

    if (todaysForecast.length < 1) {
        return (
            <Skeleton className="sm-2:col-span-2 col-span-full h-48 w-full md:col-span-2 xl:col-span-2" />
        );
    }

    const getIcon = () => {
        switch (weatherMain) {
            case "Drizzle":
                return drizzleIcon;
            case "Rain":
                return rain;
            case "Snow":
                return snow;
            case "Clear":
                return clearSky;
            case "Clouds":
                return cloudy;
            default:
                return clearSky;
        }
    };

    return (
        <div className='sm-2:col-span-2 col-span-full flex h-48 flex-col gap-8 rounded-lg border px-4
        pt-6 shadow-sm dark:bg-dark-grey dark:shadow-none md:col-span-2 xl:col-span-2'>
            <div className="flex h-full gap-10 overflow-hidden">
                {todaysForecast.length < 1 ? (
                    <div className="flex items-center justify-center">
                        <h1 className="text-[3rem] text-rose-500 line-through">
                            No Data Available!
                        </h1>
                    </div>
                ) : (
                    <div className="w-full">
<Carousel>
    <CarouselContent className='mt-2'>
        {list.slice(1, 9).map(
            (forecast: { dt_txt: string; main: { temp: number } }) => {
                return (
                    <CarouselItem
                        key={forecast.dt_txt}
                        className="mx-1 flex basis-20 cursor-grab flex-col items-center gap-2 rounded
                        bg-zinc-300 py-2 pl-0 dark:bg-zinc-900">
                        <p className="mt-0.5 text-lg font-medium">
                            {moment(forecast.dt_txt).format("HH:mm")}
                        </p>

                        <p>{getIcon()}</p>

                        <p className="mt-1 text-lg font-medium dark:text-gray-300">
                            {kelvinToCelsius(forecast.main.temp)}°C
                        </p>
                    </CarouselItem>
                );
            }
        )}
    </CarouselContent>
</Carousel>

                    </div>
                )}
            </div>
        </div>
    )
}

export default DailyForecast