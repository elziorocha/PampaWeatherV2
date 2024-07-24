import dynamic from 'next/dynamic';
import React from 'react';

const Mapbox = dynamic(() => import('./Mapbox'), { ssr: false });

const MapboxWrapper = () => {
    return <Mapbox />;
};

export default MapboxWrapper;
