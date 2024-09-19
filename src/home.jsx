import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import { useLocation } from 'react-router-dom'

import './index.css'
import 'leaflet/dist/leaflet.css'
import { NavBar } from './navigation/nav'

export function Home() {
  const {state} = useLocation()
  const element = state
  const position = [element.y, element.x]
  // const position = [1.063861111111111, 38.66755555555555]

  return (
      <div>
          <NavBar />
          <div>
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
                </MapContainer>
          </div>
      </div>
)
}


