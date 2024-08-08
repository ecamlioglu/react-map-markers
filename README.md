# React Map Markers

This project is a NextJS App project for creating and managing map markers using Google Maps API. It allows for adding, removing, and customizing markers, and includes functionalities for creating routes with saved locations. This library uses Zustand for state management and Chakra UI for styling components.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [CI/CD](#cicd)
- [License](#license)

## Features

- Add and remove markers on Google Maps
- Customizable marker popups showing latitude and longitude
- Simple color selection panel for marker customization
- Route creation with saved locations
- State management with Zustand
- Styling with Chakra UI

## Installation

To install the package, you can use npm or yarn:

```bash
npm install react-map-markers @chakra-ui/react @emotion/react @emotion/styled framer-motion

or

yarn add react-map-markers @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

## API Reference
I’ve used the Google Maps JS API with visgl/react-google-maps. If you need inspiration, check out their API examples to ensure this map documentation aligns with your vision too.

## Contributing
I welcome contributions to improve this library! If you have any suggestions, feature requests, or bug reports, please open an issue or submit a pull request. 

CI/CD
I use GitHub Actions for continuous integration and continuous deployment. The CI/CD pipeline is defined in the .github/workflows directory. This workflow sending build result directly to Netlify.

Workflows
Build: This workflow runs on every push and pull request to ensure the code builds correctly.
Deploy: This workflow runs on the main branch and deploys the application to the production environment.
