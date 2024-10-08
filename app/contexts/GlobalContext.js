"use Client"
import React, { createContext, useContext, useEffect, useState } from "react"
import axios from "axios";
import defaultStates from "../utils/defaultStates";
import { debounce } from "lodash"

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({ children }) => {

    const [forecast, setForecast] = useState({});
    const [airQuality, setAirQuality] = useState({});
    const [fiveDayForecast, setFiveDayForecast] = useState({});
    const [uvIndex, setUvIndex] = useState({});
    const [geoCodedList, setGeoCodedList] = useState(defaultStates);
    const [inputValue, setInputValue] = useState("");
    const [activeCityCoords, setActiveCityCoords] = useState([-25.4297, -49.2719,]);

    const fetchForecast = async (lat, lon) => {
        try {
            const res = await axios.get(`api/weather?lat=${lat}&lon=${lon}`)

            setForecast(res.data)
        } catch (error) {
            console.log("Error fetching forecast data", error.message)
        }
    }

    const fetchAirQuality = async (lat, lon) => {
        try {
            const res = await axios.get(`api/pollution?lat=${lat}&lon=${lon}`)

            setAirQuality(res.data)
        } catch (error) {
            console.log("Error fetching air quality data", error.message)
        }
    }

    const fetchFiveDayForecast = async (lat, lon) => {
        try {
            const res = await axios.get(`api/fiveday?lat=${lat}&lon=${lon}`);

            setFiveDayForecast(res.data);
        } catch (error) {
            console.log("Error fetching five day forecast data", error.message);
        }
    };

    const fetchGeoCodedList = async (search) => {
        try {
            const res = await axios.get(`/api/geocoded?search=${search}`);

            setGeoCodedList(res.data);
        } catch (error) {
            console.log("Error fetching geocoded list: ", error.message);
        }
    }

    const fetchUvIndex = async (lat, lon) => {
        try {
            const res = await axios.get(`api/uvindex?lat=${lat}&lon=${lon}`)

            setUvIndex(res.data)
        } catch (error) {
            console.log("Error getting UV data", error.message)
        }
    }

    const handleInput = (e) => {
        setInputValue(e.target.value);

        if (e.target.value === "") {
            setGeoCodedList(defaultStates);
        }
    }

    /* eslint-disable */
    useEffect(() => {
        const debouncedFetch = debounce((search) => {
            fetchGeoCodedList(search)
        }, 100)

        if (inputValue) {
            debouncedFetch(inputValue)
        }

        return () => debouncedFetch.cancel()
    }, [inputValue])
    /* eslint-enable */

    useEffect(() => {
        fetchForecast(activeCityCoords[0], activeCityCoords[1]);
        fetchAirQuality(activeCityCoords[0], activeCityCoords[1]);
        fetchFiveDayForecast(activeCityCoords[0], activeCityCoords[1]);
        fetchUvIndex(activeCityCoords[0], activeCityCoords[1]);
    }, [activeCityCoords])

    return (
        <GlobalContext.Provider
            value={{
                forecast,
                airQuality,
                fiveDayForecast,
                uvIndex,
                geoCodedList,
                inputValue,
                handleInput,
                setActiveCityCoords
            }}>
            <GlobalContextUpdate.Provider value={{ setActiveCityCoords }}>
                {children}
            </GlobalContextUpdate.Provider>
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);