import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet'
import L from 'leaflet'

import 'leaflet/dist/leaflet.css'

delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',

  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',

  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

function MoveMap({ center }) {
  const map = useMap()

  useEffect(() => {
    map.setView(center, map.getZoom())
  }, [center])

  return null
}

const DriverTrackingMap = ({ dispatch, location }) => {
  const pickup = [dispatch.pickupLatitude || 6.1454, dispatch.pickupLongitude || 6.7885]

  const destination = [dispatch.deliveryLatitude || 6.2101, dispatch.deliveryLongitude || 6.8432]

  const driver = location ? [location.latitude, location.longitude] : pickup

  return (
    <MapContainer
      center={driver}
      zoom={13}
      style={{
        height: '500px',
        width: '100%',
        borderRadius: '10px',
      }}
    >
      <MoveMap center={driver} />

      <TileLayer
        attribution="OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={pickup}>
        <Popup>Pickup Location</Popup>
      </Marker>

      <Marker position={destination}>
        <Popup>Delivery Location</Popup>
      </Marker>

      <Marker position={driver}>
        <Popup>Driver Current Location</Popup>
      </Marker>

      <Polyline positions={[pickup, driver, destination]} />
    </MapContainer>
  )
}

export default DriverTrackingMap
