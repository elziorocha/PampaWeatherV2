"use client"
import React, { useEffect } from 'react'
import { MapContainer, TileLayer, useMap, MapContainerProps } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useGlobalContext } from "@/app/contexts/GlobalContext";
import { LatLngExpression } from 'leaflet';

function FlyToActiveCity({activeCityCoords}: { activeCityCoords: { lat: number, lon: number } }) {
    
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

    const activeCityCoords = forecast?.coord;

    if (!forecast || !forecast.coord || !activeCityCoords) {
        return (
            <div className='flex size-full items-center justify-center'>
                <h1 className='text-lg font-medium italic'>Loading...</h1>
            </div>
        );
    }

    const center: LatLngExpression = [activeCityCoords.lat, activeCityCoords.lon];

    return (
        <div className='flex-1 basis-1/2 rounded-lg border'>
            <MapContainer center={center}
                zoom={13}
                scrollWheelZoom={false}
                className="m-4 rounded-lg"
                style={{ height: "calc(100% - 2rem)", width: "calc(100% - 2rem)" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                <FlyToActiveCity activeCityCoords={activeCityCoords} />
            </MapContainer>
        </div>
    );
};

export default Mapbox;
