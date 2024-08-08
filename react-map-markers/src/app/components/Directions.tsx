'use client'

import { CloseIcon } from "@chakra-ui/icons";
import { Box, Button, IconButton, VStack, Text, Divider, List, ListItem, Flex } from "@chakra-ui/react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useState, useEffect } from "react";

type DirectionsProps = {
    origin: google.maps.LatLngLiteral;
    destination: google.maps.LatLngLiteral;
    name: string;
    onClose: () => void;
};

const Directions = ({
    origin,
    destination,
    name,
    onClose
}: DirectionsProps) => {
    const map = useMap();
    const routesLibrary = useMapsLibrary('routes');
    const [directionsService, setDirectionsService] =
        useState<google.maps.DirectionsService>();
    const [directionsRenderer, setDirectionsRenderer] =
        useState<google.maps.DirectionsRenderer>();
    const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
    const [routeIndex, setRouteIndex] = useState(0);
    const selected = routes[routeIndex];
    const leg = selected?.legs[0];

    useEffect(() => {
        if (!routesLibrary || !map) return;
        setDirectionsService(new routesLibrary.DirectionsService());
        setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
    }, [routesLibrary, map]);

    useEffect(() => {
        if (!directionsService || !directionsRenderer) return;

        directionsService
            .route({
                origin: origin,
                destination: destination,
                travelMode: google.maps.TravelMode.DRIVING,
                provideRouteAlternatives: true,
                region: 'tr',
                unitSystem: google.maps.UnitSystem.METRIC
            })
            .then(response => {
                directionsRenderer.setDirections(response);
                setRoutes(response.routes);
            });

        return () => directionsRenderer.setMap(null);
    }, [directionsService, directionsRenderer]);

    useEffect(() => {
        if (!directionsRenderer) return;
        directionsRenderer.setRouteIndex(routeIndex);
    }, [routeIndex, directionsRenderer]);

    if (!leg) return null;

    return (
        <Box
            position="absolute"
            bottom="10px"
            left="10px"
            width={{ base: '90%', md: '40%' }}
            maxW="md"
            backgroundColor="white"
            padding="8px"
            borderRadius="md"
            boxShadow="md"
            zIndex="1"
        >
            <VStack spacing={4} align="start">
                <Flex justify="space-between" width="100%">
                    <Text fontWeight="bold" fontSize="lg">Route Details</Text>
                    <IconButton
                        aria-label="Close panel"
                        icon={<CloseIcon />}
                        size="sm"
                        variant="ghost"
                        onClick={onClose}
                    />
                </Flex>
                <Box border="1px" borderColor="gray.200" borderRadius="md" p={4}>
                    <Text mb={2}>From: {origin.lat.toFixed(4)}, {origin.lng.toFixed(4)}</Text>
                    <Text mb={2}>To: {destination.lat.toFixed(4)}, {destination.lng.toFixed(4)}</Text>
                    <Divider mb={2} />
                    <Text fontSize="lg" fontWeight="bold">Distance: {leg.distance?.text}</Text>
                    <Text fontSize="lg" fontWeight="bold">Duration: {leg.duration?.text}</Text>
                    <Text mt={2} fontSize="md">
                        {leg.start_address.split(',')[0]} to {leg.end_address.split(',')[0]}
                    </Text>
                </Box>
                <Box width="100%">
                    <Text fontWeight="bold" mb={2}>Other Routes</Text>
                    <List spacing={2}>
                        {routes.map((route, index) => (
                            <ListItem key={route.summary}>
                                <Button
                                    width="full"
                                    variant={index === routeIndex ? 'solid' : 'outline'}
                                    colorScheme={index === routeIndex ? 'blue' : 'gray'}
                                    onClick={() => setRouteIndex(index)}
                                >
                                    {route.summary}
                                </Button>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </VStack>
        </Box>
    );
};

export default Directions;