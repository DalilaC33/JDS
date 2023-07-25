//Código obtenido de https://github.com/colbyfayock/next-leaflet-starter
//https://react-leaflet.js.org/docs/api-map/
import { useEffect, useState } from 'react';
import L from 'leaflet';
import * as ReactLeaflet from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

const { MapContainer, MapConsumer, useMap, useMapEvents } = ReactLeaflet

function Marker({center, activateFlagError}) {
  try {
    const map = useMap()
    map.setView(center)
  } catch (error) {
    activateFlagError('Hola Mundo')
  }
  return null
}

function SelectPoint({setCurrentPoint, activateFlagError}) {
  try {
    const map = useMapEvents({
      click: (e) => {
        map.locate()
        setCurrentPoint && setCurrentPoint(`${e.latlng.lat}, ${e.latlng.lng}`)
      }
    })
  } catch (error) {
    activateFlagError('Chau Mundo')
  }
  return null
}

const Map = ({ children, className, center, zoom, setCurrentPoint, activateFlagError }) => {

  const init = async () => {
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
          iconRetinaUrl: iconRetinaUrl.src,
          iconUrl: iconUrl.src,
          shadowUrl: shadowUrl.src,
      })
  }

  useEffect(() => {
      init()
  }, [])

  return (
    <MapContainer className={className? className : ''} center={center} zoom={zoom} style={{width: '100%'}}>
      <MapConsumer>
        {(map) => children(ReactLeaflet, map)}
      </MapConsumer>
      <Marker center={center} activateFlagError={activateFlagError}/>
      <SelectPoint setCurrentPoint={setCurrentPoint} activateFlagError={activateFlagError}/>
    </MapContainer>
  )
}

export default Map;