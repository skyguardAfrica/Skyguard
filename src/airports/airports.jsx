import { useState } from 'react'
import { GeoJSON, useMapEvents} from 'react-leaflet'
import L from 'leaflet'
import 'leaflet-geosearch/dist/geosearch.css'

import { SearchControl, OpenStreetMapProvider } from 'leaflet-geosearch'
import { filterByCategory } from '../utils'

export function AirportMarker({airports}) {

    const airportByCategory = filterByCategory(airports)

    function marker(airport, latlng){
        return L.circleMarker(latlng, geojsonMarkerOptions)
    }

    const provider = new OpenStreetMapProvider()

    const searchControl = new SearchControl({
        provider: provider,
        style: 'bar',
        searchLabel: 'Where do you want to fly',
        animateZoom: true
      });

    const map = useMapEvents({
        click(loc) {
            console.log('Current Zoom Level: ' + map.getZoom())
            map.flyTo(loc.latlng, map.getZoom()+3)
        },
        locationfound(loc) {
            console.log(loc)
            map.flyTo(loc.latlng, map.getZoom()+5)
        }, 
    })

    map.addControl(searchControl)

    return (
        <div>
            <GeoJSON 
                data={airportByCategory['A']} 
                style={airports_style ['A']}
                // onEachFeature={onAirportSelected}
                pointToLayer={marker}
            />

            <GeoJSON 
                data={airportByCategory['B']} 
                style={airports_style['B']}
                // onEachFeature={onAirportSelected}
                pointToLayer={marker}
            />

            <GeoJSON 
                data={airportByCategory['C']} 
                style={airports_style['C']}
                // onEachFeature={onAirportSelected}
                pointToLayer={marker}
            />

            <GeoJSON 
                data={airportByCategory['D']} 
                style={airports_style['D']}
                // onEachFeature={onAirportSelected}
                pointToLayer={marker}
            />

            <GeoJSON 
                data={airportByCategory['E']} 
                style={airports_style['E']}
                // onEachFeature={onAirportSelected}
                pointToLayer={marker}
            />
        </div>

    )
}

const airports_style = {
    'A': {
        fillColor: '#e30909',
        fillOpacity: 0.75,
    },
    'B': {
        fillColor: '#eb9605',
        fillOpacity: 0.75,
    },
    'C': {
        fillColor: '#70eb05',
        fillOpacity: 0.75,
    },
    'D': {
        fillColor: '#05ebb2',
        fillOpacity: 0.75,
    },
    'E': {
        fillColor: '#0578eb',
        fillOpacity: 0.75,
    },

}

const geojsonMarkerOptions = {
    radius: 4,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 0.1,
    fillOpacity: 0.8
};