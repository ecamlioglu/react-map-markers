'use client'

import { useState, useEffect } from "react";
import { Box, Heading, List, ListItem, Text } from "@chakra-ui/react";
import { Map, MapCameraChangedEvent, MapMouseEvent, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import { useMarkerStore } from "@/store/useMarkerStore";
import Directions from "../components/Directions";

const center : google.maps.LatLngLiteral = {
  lat: 37.7749,
  lng: -122.4194,
};

export default function Home() {
    const markers = useMarkerStore((state) => state.markers);
  const selectedMarkers = useMarkerStore((state) => state.selectedMarkers);
  const setSelectedMarker = useMarkerStore((state) => state.setSelectedMarker);
  const toggleSelectMarker = useMarkerStore((state) => state.toggleSelectMarker);
  const clearSelectedMarkers = useMarkerStore((state) => state.clearSelectedMarkers);

  const [mapCenter, setMapCenter] = useState(center);

  const onMapClick = (event: MapMouseEvent) => {
    const lat = event.detail.latLng?.lat ?? 0;
    const lng = event.detail.latLng?.lng ?? 0;
    setSelectedMarker({ lat, lng, color: "#000000", time: new Date(), name: "" });
  };

  useEffect(() => {
    if (selectedMarkers.length > 0) {
      setMapCenter({ lat: selectedMarkers[0].lat, lng: selectedMarkers[0].lng });
    }
  }, [selectedMarkers]);

  return (
    <Box display="flex" width="100%">
       <Map
          style={{width: '100vw', height: 'calc(100vh - 60px)'}}
          defaultZoom={8}
          mapId='ROUTER_MAP'
          defaultCenter={ center }>
        {markers.map((marker, index) => (
          <AdvancedMarker
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            title={marker.name}
            onClick={() => toggleSelectMarker(marker)}>
              <Pin background={marker.color} glyphColor={'#000'} borderColor={'#000'} />
            </AdvancedMarker>
        ))}

        {selectedMarkers.length === 2 && (
          <Directions origin={selectedMarkers[0]} destination={selectedMarkers[1]} name="Directions" onClose={() => {clearSelectedMarkers();}}/>
        )}
      </Map>
      {markers.length > 0 && (
        <div>
        <Box width="25%" maxHeight="60%" overflow='auto' padding="2%" position="absolute" right="8" top="36"
          backgroundColor="white" boxShadow="lg">
          <Heading as="h3" size="md" mb="4">
            Select Origin & Destination
          </Heading>
          <List spacing={3}>
            {markers.map((marker, index) => (
              <ListItem
                key={index}
                p="3"
                borderRadius="md"
                backgroundColor={selectedMarkers.includes(marker) ? "blue.100" : "gray.100"}
                _hover={{ backgroundColor: "gray.200" }}
                cursor="pointer"
                onClick={() => {
                    if (selectedMarkers.length === 2 && !selectedMarkers.includes(marker)) {
                      clearSelectedMarkers();
                    }
                    toggleSelectMarker(marker);
                  }}
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