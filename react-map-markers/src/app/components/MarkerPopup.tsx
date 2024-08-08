import { useState, useEffect } from 'react';
import { Box, Button, Input, VStack, IconButton } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { useMarkerStore } from '../../store/useMarkerStore';

type MarkerPopupProps = {
  lat: number;
  lng: number;
  color: string;
  name: string;
  onClose: () => void;
  onColorChange: (color: string) => void;
  onNameChange: (name: string) => void;
  isUpdate: boolean;
};

const MarkerPopup = ({
  lat,
  lng,
  color,
  name,
  onClose,
  onColorChange,
  onNameChange,
  isUpdate,
}: MarkerPopupProps) => {
  const [selectedColor, setSelectedColor] = useState(color);
  const [locationName, setLocationName] = useState(name);
  const addMarker = useMarkerStore((state) => state.addMarker);
  const updateMarker = useMarkerStore((state) => state.updateMarker);

  useEffect(() => {
    setSelectedColor(color);
  }, [color]);

  useEffect(() => {
    setLocationName(name);
  }, [name]);

  const handleSave = () => {
    const marker = { lat, lng, color: selectedColor, time: new Date(), name: locationName };
    if (isUpdate) {
      updateMarker(marker);
    } else {
      addMarker(marker);
    }
    onClose();
  };

  return (
    <Box
      position="absolute"
      top="10px"
      left="10px"
      backgroundColor="white"
      padding="10px"
      borderRadius="5px"
      shadow="md"
      zIndex="1"
    >
      <VStack spacing={4}>
        <Box display="flex" justifyContent="space-between" width="100%">
          <Box>
            Lat: {lat.toFixed(4)}, Lng: {lng.toFixed(4)}
          </Box>
          <IconButton
            aria-label="Close"
            icon={<CloseIcon />}
            size="sm"
            onClick={onClose}
          />
        </Box>
        <Input
          type="text"
          value={locationName}
          placeholder="Location Name"
          onChange={(e) => {
            setLocationName(e.target.value);
            onNameChange(e.target.value);
          }}
        />
        <Input
          type="color"
          value={selectedColor}
          onChange={(e) => {
            setSelectedColor(e.target.value);
            onColorChange(e.target.value);
          }}
        />
        <Button onClick={handleSave} colorScheme="blue">
          {isUpdate ? 'Update' : 'Add'}
        </Button>
      </VStack>
    </Box>
  );
};

export default MarkerPopup;