"use client"
import { useGlobalContext } from '@/app/contexts/GlobalContext'
import { kelvinToCelsius } from '@/app/utils/misc';
import React, { useEffect, useState } from "react";
import {
    clearSky,
    cloudy,
    drizzleIcon,
    navigation,
    rain,
    snow,
    mist
} from "@/app/utils/Icons";
import moment from 'moment';

const Temperature = () => {

    const { forecast } = useGlobalContext();
    const { main, timezone, name, weather } = forecast

    if (!forecast || !weather) {
        return <div className='flex items-center justify-center'>Loading...</div>
    }

    const temp = kelvinToCelsius(main?.temp)
    const minTemp = kelvinToCelsius(main?.temp_min)
    const maxTemp = kelvinToCelsius(main?.temp_max)

    /* eslint-disable */
    const [localTime, setLocalTime] = useState<string>("")
    const [currentDay, setCurrentDay] = useState<string>("");

    const { main: weatherMain, description } = weather[0];

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
            case "Mist":
                return mist;
            default:
                return clearSky;
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const localMoment = moment().utcOffset(timezone / 60);

            const formatedTime = localMoment.format("HH:mm:ss");
            const day = localMoment.format("dddd");

            setLocalTime(formatedTime);
            setCurrentDay(day);
        }, 1000);

        return () => clearInterval(interval);
    }, [timezone]);

    return (
        <div className='py-5 px-4 border rounded-lg flex flex-col justify-between shadow-md dark:shadow-none
        dark:bg-dark-grey'>
            <p className="flex pr-2 justify-between items-center font-medium text-lg italic">
                <span>{currentDay}</span>
                <span>{localTime}</span>
            </p>
            <p className="pt-1 font-bold flex gap-1 items-center">
                <span className='text-2xl'>{name}</span>
                <span>{navigation}</span>
            </p>
            <p className="pt-10 pb-4 text-8xl font-bold self-center">{temp}°C</p>
            <p className="flex items-center gap-2 font-medium justify-center text-base bg-zinc-200 dark:bg-zinc-900 w-7/12
            self-center rounded-lg py-1 mb-9">
                <span>Low: {minTemp}°C</span>
                <span>High: {maxTemp}°C</span>
            </p>

            <span className='pt-2'>{getIcon()}</span>
            <p className="pt-2 capitalize text-xl font-medium">{description}</p>
        </div>
    )
}

export default Temperature