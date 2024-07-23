"use client";
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useGlobalContext } from "@/app/contexts/GlobalContext";
import { LatLngTuple } from 'leaflet'; // Import LatLngTuple from leaflet

interface Coordinates {
    lat: number;
    lon: number;
}

function FlyToActiveCity({ activeCityCoords }: { activeCityCoords: Coordinates | undefined }) {
    const map = useMap();

    useEffect(() => {
        if (activeCityCoords) {
            const zoomLev = 13;
            const flyToOptions = {
                duration: 1.5,
            };

            map.flyTo([activeCityCoords.lat, activeCityCoords.lon], zoomLev, flyToOptions);
        }
    }, [activeCityCoords, map]);

    return null;
}

const Mapbox = () => {
    const { forecast } = useGlobalContext();

    const activeCityCoords: Coordinates | undefined = forecast?.coord;

    if (!forecast || !forecast.coord || !activeCityCoords) {
        return (
            <div className='flex size-full items-center justify-center'>
                <h1 className='text-lg font-medium italic'>Loading...</h1>
            </div>
        );
    }

    const position: LatLngTuple = [activeCityCoords.lat, activeCityCoords.lon];

    return (
        <div className='flex-1 basis-1/2 rounded-lg border'>
            <h2 className='flex items-center w-full justify-center h-full text-2xl text-rose-600 line-through'>
                No Map Data Available
            </h2>
            {/* <MapContainer
                center={position}
                zoom={13}
                scrollWheelZoom={false}
                className="m-4 rounded-lg"
                style={{ height: "calc(100% - 2rem)", width: "calc(100% - 2rem)" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <FlyToActiveCity activeCityCoords={activeCityCoords} />
            </MapContainer> */}
        </div>
    );
}

export default Mapbox;
