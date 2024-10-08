'use client'

import { useState, useEffect } from "react";
import { Box, Heading, List, ListItem, Text } from "@chakra-ui/react";
import { useMarkerStore } from "../store/useMarkerStore";
import { Map, MapCameraChangedEvent, MapMouseEvent, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import MarkerPopup from "./components/MarkerPopup";

const center : google.maps.LatLngLiteral = {
  lat: 37.7749,
  lng: -122.4194,
};

export default function Home() {
  const markers = useMarkerStore((state) => state.markers);
  const selectedMarker = useMarkerStore((state) => state.selectedMarker);
  const selectedMarkers = useMarkerStore((state) => state.selectedMarkers);
  const setSelectedMarker = useMarkerStore((state) => state.setSelectedMarker);
  const toggleSelectMarker = useMarkerStore((state) => state.toggleSelectMarker);
  const updateSelectedMarker = useMarkerStore((state) => state.updateSelectedMarker);
  const clearSelectedMarkers = useMarkerStore((state) => state.clearSelectedMarkers);

  const [mapCenter, setMapCenter] = useState(center);

  const onMapClick = (event: MapMouseEvent) => {
    const lat = event.detail.latLng?.lat ?? 0;
    const lng = event.detail.latLng?.lng ?? 0;
    setSelectedMarker({ lat, lng, color: "#000000", time: new Date(), name: "" });
  };

  const handlePopupClose = () => {
    setSelectedMarker(null);
  };

  const handleColorChange = (color: string) => {
    if (selectedMarker) {
      updateSelectedMarker({ color });
    }
  };

  const handleNameChange = (name: string) => {
    if (selectedMarker) {
      updateSelectedMarker({ name });
    }
  };

  useEffect(() => {
    if (selectedMarker) {
      setMapCenter({ lat: selectedMarker.lat, lng: selectedMarker.lng });
    }
  }, [selectedMarker]);

  const isUpdate = markers.some(
    (marker) => marker.lat === selectedMarker?.lat && marker.lng === selectedMarker?.lng
  );
  return (
    <Box display="flex" width="100%">
       <Map
          style={{width: '100vw', height: '100vh'}}
          defaultZoom={8}
          mapId='SELECTABLE_MAP'
          defaultCenter={ center }
          onClick={onMapClick}
          >
        {markers.map((marker, index) => (
          <AdvancedMarker
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            title={marker.name}
            onClick={() => toggleSelectMarker(marker)}>
              <Pin background={marker.color} glyphColor={'#000'} borderColor={'#000'} />
            </AdvancedMarker>
        ))}
        {selectedMarker && (
          <div>
          <AdvancedMarker
            key={selectedMarker.name}
            position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
            title={selectedMarker.name}
            onClick={() => setSelectedMarker(selectedMarker)}>
              <Pin background={selectedMarker.color} glyphColor={'#000'} borderColor={'#000'} />
            </AdvancedMarker>
            <MarkerPopup
              lat={selectedMarker.lat}
              lng={selectedMarker.lng}
              color={selectedMarker.color}
              name={selectedMarker.name}
              onClose={handlePopupClose}
              onColorChange={handleColorChange}
              onNameChange={handleNameChange}
              isUpdate={isUpdate}
            />
          </div>
        )}
      </Map>
      {markers.length > 0 && (
        <div>
        <Box width="30%" padding="2%" position="absolute" right="8" top="16"
          backgroundColor="white" boxShadow="lg">
          <Heading as="h3" size="lg" mb="4">
            Locations
          </Heading>
          <List spacing={3}>
            {markers.map((marker, index) => (
              <ListItem
                key={index}
                p="3"
                borderRadius="md"
                backgroundColor="gray.100"
                _hover={{ backgroundColor: "gray.200" }}
                cursor="pointer"
                onClick={() => setSelectedMarker(marker)}
              >
                <Text fontWeight="bold">{marker.name}</Text>
                <Text fontSize="sm">Lat: {marker.lat.toFixed(4)}, Lng: {marker.lng.toFixed(4)}</Text>
              </ListItem>
            ))}
          </List>
        </Box>
        </div>
      )}
    </Box>
  );
}