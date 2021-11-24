import React from 'react'
import { useState, useCallback } from 'react';
import MapGL, { Marker, NavigationControl } from '@goongmaps/goong-map-react';

import ControlPanel from './ControlPanel';
import Pin from './Pin';

const TOKEN = 'OCqzyL0YNn1hr3A72bKPzIrMT1ZtIDzIX65ltPOo';

const navStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: '10px'
};

export default function GoongMap() {

    const [viewport, setViewport] = useState({
        latitude: 10.7767426,
        longitude: 106.70325005842233,
        zoom: 12,
        bearing: 0,
        pitch: 0
    });
    const [marker, setMarker] = useState({
        latitude: 10.7767426,
        longitude: 106.70325005842233
    });
    const [events, logEvents] = useState({});

    const onMarkerDragStart = useCallback(event => {
        logEvents(_events => ({ ..._events, onDragStart: event.lngLat }));
    }, []);

    const onMarkerDrag = useCallback(event => {
        logEvents(_events => ({ ..._events, onDrag: event.lngLat }));
    }, []);

    const onMarkerDragEnd = useCallback(event => {
        logEvents(_events => ({ ..._events, onDragEnd: event.lngLat }));
        setMarker({
            longitude: event.lngLat[0],
            latitude: event.lngLat[1]
        });
    }, []);

    console.log('events', events);

    return (
        <>
            <MapGL
                {...viewport}
                width="100%"
                height="100%"
                mapStyle="https://tiles.goong.io/assets/goong_map_dark.json"
                onViewportChange={setViewport}
                goongApiAccessToken={TOKEN}
            >
                <Marker
                    longitude={marker.longitude}
                    latitude={marker.latitude}
                    offsetTop={-20}
                    offsetLeft={-10}
                    draggable
                    onDragStart={onMarkerDragStart}
                    onDrag={onMarkerDrag}
                    onDragEnd={onMarkerDragEnd}
                >
                    <Pin size={20} />
                </Marker>

                <div className="nav" style={navStyle}>
                    <NavigationControl />
                </div>
            </MapGL>
            <ControlPanel events={events} />
        </>
    )
}
