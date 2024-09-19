import React from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import { useLocation } from 'react-router-dom'

import './index.css'
import 'leaflet/dist/leaflet.css'
import airports from './data/Airports.json'
import airspace from './data/Airspace.json'
import { AirportMarker } from './airports/airports'
import { AirspaceBuffer } from './airspaces/airspaces'
import { NavBar } from './navigation/nav'

export function Home() {
const {state} = useLocation()
const element = state
const position = [element.y, element.x]
// const position = [1.063861111111111, 38.66755555555555]

function marker(airport, latlng){
    return L.circleMarker(latlng, geojsonMarkerOptions)
}

return (
    <div style={styles.container}>
        <div style={styles.nav}>
            <NavBar />
        </div>
        <div style={styles.body}>
                <MapContainer center={position} zoom={13} minZoom={7}>
                <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    />

                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                        opacity={0.5}
                    />
                    <Marker position={position}> 
                        <Popup> {element.label} </Popup>
                    </Marker>
                    <AirportMarker airports={airports}/>
                    <AirspaceBuffer airspace={airspace}/> 
                </MapContainer>
        </div>
    </div>
)
}

const geojsonMarkerOptions = {
radius: 4,
fillColor: "#ff7800",
color: "#000",
weight: 1,
opacity: 0.1,
fillOpacity: 0.8
};

const styles = {
    container: {
        width: '100%',
        height: '100%',
    }, 
    nav: {
        position: 'fixed',
        width: '100%',
        height: '3.5rem',
        top: 0,
        left: 0,
    },
    body: {
        top: '3.5rem',
    }
}
