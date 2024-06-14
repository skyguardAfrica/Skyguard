import { useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMapEvents, GeoJSON} from 'react-leaflet'
import L from 'leaflet'
import { filterByCategory } from '../utils'

import Airspaces from '../data/ke_asp.json'

export function AirspaceBuffer({airspace}) {

    const airspaceByCategory = filterByCategory(airspace)

    return (
        <div>
            <GeoJSON
                data={airspaceByCategory['A']}
                style={airspaceMarker}
            />

            <GeoJSON
                data={airspaceByCategory['B']}
                style={airspaceMarker}
            />

            <GeoJSON
                data={airspaceByCategory['C']}
                style={airspaceMarker}
            />

            <GeoJSON
                data={airspaceByCategory['D']}
                style={airspaceMarker}
            />

            <GeoJSON
                data={airspaceByCategory['E']}
                style={airspaceMarker}
            />

            <GeoJSON 
                data={Airspaces}
                style={airspaceMarker}
            />
        </div>
    )
}

const airspaceMarker = {
        fillColor: "#ff7800",
        color: "#000",
        weight: 1,
        opacity: 0.1,

};