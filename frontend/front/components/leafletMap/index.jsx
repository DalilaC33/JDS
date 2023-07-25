import Map from './map'
import styles from '../../styles/Home.module.css'
import { useEffect } from 'react'

const LeafletMap = ({default_center, setCenter, activateFlagError}) => {

    const DEFAULT_CENTER = default_center.split(', ')

    return (
        <Map  className={styles.homeMap} 
              center={DEFAULT_CENTER} 
              zoom={13} 
              setCurrentPoint={setCenter} 
              activateFlagError={activateFlagError}>
          {({ TileLayer, Marker }) => (
            <>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors" />
              <Marker position={DEFAULT_CENTER}></Marker>
            </>
          )}
        </Map>
    )
}

export default LeafletMap