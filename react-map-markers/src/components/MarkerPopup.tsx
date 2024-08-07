'use client'

import { useState, useEffect } from "react";
import { Box, Button, IconButton, Input, Text, VStack } from "@chakra-ui/react";
import { CloseIcon } from '@chakra-ui/icons';

import { useMarkerStore } from "../store/useMarkerStore";

type MarkerPopupProps = {
    lat: number;
    lng: number;
    color: string;
    name: string;
    onClose: () => void;
    onColorChange: (color: string) => void;
    onNameChange: (name: string) => void;
};

const MarkerPopup = ({ lat, lng, color, name, onClose, onColorChange, onNameChange }: MarkerPopupProps) => {
    const [selectedColor, setSelectedColor] = useState(color);
    const [locationName, setLocationName] = useState(name);

    useEffect(() => {
        setSelectedColor(color);
    }, [color]);

    useEffect(() => {
        setLocationName(name);
    }, [name]);

    const handleAdd = () => {
        const addMarker = useMarkerStore.getState().addMarker;
        addMarker({ lat, lng, color: selectedColor, time: new Date(), name: locationName });
        onClose();
    };

    return (
        <Box
            position="absolute"
            top="52%"
            left="2.5%"
            backgroundColor="white"
            padding="10px"
            borderRadius="14px"
            shadow="lg"
            zIndex="1"
        >
            <IconButton
                aria-label="Close"
                icon={<CloseIcon />}
                size="sm"
                onClick={onClose}
            />
            <VStack spacing={4}>
                <Text fontSize={'larger'} fontWeight={'bolder'} style={{ alignSelf: 'center' }} >Location</Text>
                <Text style={{ alignSelf: 'start' }} >Name:</Text>
                <Input
                    type="text"
                    value={locationName}
                    placeholder="Location Name"
                    onChange={(e) => {
                        setLocationName(e.target.value);
                        onNameChange(e.target.value);
                    }}
                />
                <Text style={{ alignSelf: 'start' }} >Marker</Text>
                <Box fontSize={'larger'}>
                    Lat: {lat.toFixed(4)}, Lng: {lng.toFixed(4)}
                </Box>
                <Text style={{ alignSelf: 'start' }} >Renk:</Text>
                <Input
                    type="color"
                    value={selectedColor}
                    onChange={(e) => {
                        setSelectedColor(e.target.value);
                        onColorChange(e.target.value);
                    }}
                />
                <Button inlineSize={'-webkit-fill-available'} onClick={handleAdd} colorScheme="blue">
                    Ekle
                </Button>
            </VStack>
        </Box>
    );
};

export default MarkerPopup;