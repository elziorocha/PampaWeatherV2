"use Client"
import React, { createContext, useContext, useEffect, useState } from "react"
import axios from "axios";

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({ children }) => {

    const [forecast, setForecast] = useState({});
    const [airQuality, setAirQuality] = useState({});
    const [fiveDayForecast, setFiveDayForecast] = useState({});
    const [uvIndex, setUvIndex] = useState({});

    const fetchForecast = async () => {
        try {
            const res = await axios.get("api/weather")

            setForecast(res.data)
        } catch (error) {
            console.log("Error fetching forecast data", error.message)
        }
    }

    const fetchAirQuality = async () => {
        try {
            const res = await axios.get("api/pollution")

            setAirQuality(res.data)
        } catch (error) {
            console.log("Error fetching air quality data", error.message)
        }
    }

    const fetchFiveDayForecast = async (lat, lon) => {
        try {
            const res = await axios.get('api/fiveday');

            setFiveDayForecast(res.data);
        } catch (error) {
            console.log("Error fetching five day forecast data", error.message);
        }
    };

    const fetchUvIndex = async () => {
        try {
            const res = await axios.get('api/uvindex')

            setUvIndex(res.data)
        } catch (error) {
            console.log("Error getting UV data", error.message)
        }
    } 

    useEffect(() => {
        fetchForecast();
        fetchAirQuality();
        fetchFiveDayForecast();
        fetchUvIndex();
    }, [])

    return (
        <GlobalContext.Provider value={{ forecast, airQuality, fiveDayForecast, uvIndex }}>
            <GlobalContextUpdate.Provider>
                {children}
            </GlobalContextUpdate.Provider>
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);