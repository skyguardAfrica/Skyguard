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
      <div>
          <NavBar />
          <div>
                <MapContainer center={position} zoom={13} minZoom={7}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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


