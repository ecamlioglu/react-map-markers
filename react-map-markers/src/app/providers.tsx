// app/providers.tsx
'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { APIProvider } from '@vis.gl/react-google-maps';
import { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {

  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!googleMapsApiKey) {
    throw new Error("Google Maps API key is not defined");
  }

  return <>
    <ChakraProvider>

      <APIProvider apiKey={googleMapsApiKey} onLoad={() => console.log('Maps API has loaded.')}>
        {children}
      </APIProvider>
    </ChakraProvider>
  </>
}