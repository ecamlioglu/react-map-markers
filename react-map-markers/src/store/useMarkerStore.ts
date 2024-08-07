import {create} from 'zustand';

type Marker = {
  lat: number;
  lng: number;
  color: string;
  time: Date;
  name: string;
};

type MarkerStore = {
  markers: Marker[];
  selectedMarker: Marker | null;
  selectedMarkers: Marker[];
  directions: google.maps.DirectionsResult | null;
  addMarker: (marker: Marker) => void;
  setSelectedMarker: (marker: Marker | null) => void;
  toggleSelectMarker: (marker: Marker) => void;
  setDirections: (directions: google.maps.DirectionsResult | null) => void;
  clearSelectedMarkers: () => void;
  updateSelectedMarker: (marker: Partial<Marker>) => void;
};

export const useMarkerStore = create<MarkerStore>((set) => ({
  markers: [],
  selectedMarker: null,
  selectedMarkers: [],
  directions: null,
  addMarker: (marker) =>
    set((state) => ({
      markers: [...state.markers, marker],
    })),
  setSelectedMarker: (marker) => set({ selectedMarker: marker }),
  toggleSelectMarker: (marker) =>
    set((state) => {
      const isSelected = state.selectedMarkers.some(
        (m) => m.lat === marker.lat && m.lng === marker.lng
      );
      if (isSelected) {
        return {
          selectedMarkers: state.selectedMarkers.filter(
            (m) => m.lat !== marker.lat || m.lng !== marker.lng
          ),
        };
      } else {
        return { selectedMarkers: [...state.selectedMarkers, marker] };
      }
    }),
  setDirections: (directions) => set({ directions }),
  clearSelectedMarkers: () => set({ selectedMarkers: [] }),
  updateSelectedMarker: (marker) =>
    set((state) => ({
      selectedMarker: state.selectedMarker ? { ...state.selectedMarker, ...marker } : null,
    })),
}));