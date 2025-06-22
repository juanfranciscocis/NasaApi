# NASA API Wrapper

A Node.js/Express.js API that serves as a wrapper around NASA's public APIs, providing simplified access to Mars Rover photos, Astronomy Picture of the Day (APOD), and NASA's Image and Video Library.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Examples](#examples)
- [License](#license)

## Features

- Access Mars Rover photos with filtering options
- Retrieve the Astronomy Picture of the Day
- Search NASA's Image and Video Library
- Simple JSON request/response format
- CORS enabled for cross-origin requests

## Prerequisites

- Node.js (v12 or higher)
- npm (v6 or higher)
- NASA API key (obtain from [NASA API Portal](https://api.nasa.gov/))

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd NasaApi
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   NASA_API_BASE_URL=https://api.nasa.gov
   NASA_IMAGES_API_URL=https://images-api.nasa.gov
   NASA_API_KEY=your_nasa_api_key
   ```

## Configuration

The application uses the following environment variables:

- `NASA_API_BASE_URL`: Base URL for NASA's API (default: https://api.nasa.gov)
- `NASA_IMAGES_API_URL`: Base URL for NASA's Images API (default: https://images-api.nasa.gov)
- `NASA_API_KEY`: Your NASA API key

## Usage

Start the server:

```bash
npm start
```

The server will start on port 3000 by default (or the port specified in the `PORT` environment variable).

## API Endpoints

### 1. Mars Rover Photos

**Endpoint:** `POST /mars_rover`

**Request Body:**
```json
{
  "rover": "curiosity",
  "camera": "FHAZ",
  "sol": 1000
}
```

**Parameters:**
- `rover` (optional): Mars rover name. Default: "curiosity". Options: "curiosity", "opportunity", "spirit"
- `camera` (optional): Camera name. Default: null (all cameras). Use "ALL" for all cameras
- `sol` (optional): Martian sol (day) on which the photos were taken. Default: 1000

**Response:**
```json
[
  {
    "id": 102693,
    "img_src": "http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01000/opgs/edr/fcam/FLB_486265257EDR_F0481570FHAZ00323M_.JPG",
    "earth_date": "2015-05-30",
    "camera": {
      "id": 20,
      "name": "FHAZ",
      "full_name": "Front Hazard Avoidance Camera"
    },
    "rover": {
      "id": 5,
      "name": "Curiosity",
      "status": "active"
    }
  }
]
```

### 2. Astronomy Picture of the Day

**Endpoint:** `POST /picture_of_day`

**Request Body:**
```json
{
  "date": "2023-01-01"
}
```

**Parameters:**
- `date` (optional): Date for which to retrieve the picture. Default: today's date. Format: YYYY-MM-DD

**Response:**
```json
{
  "title": "The Butterfly Nebula from Hubble",
  "date": "2023-01-01",
  "explanation": "The bright clusters and nebulae of planet Earth's night sky are often named for flowers or insects...",
  "url": "https://apod.nasa.gov/apod/image/2301/Butterfly_HubbleVargas_960.jpg",
  "media_type": "image",
  "hdurl": "https://apod.nasa.gov/apod/image/2301/Butterfly_HubbleVargas_3139.jpg"
}
```

### 3. NASA Image and Video Library Search

**Endpoint:** `POST /nasa_images`

**Request Body:**
```json
{
  "query": "Mars"
}
```

**Parameters:**
- `query` (optional): Search term for NASA's image library. Default: "Earth"

**Response:**
```json
{
  "items": [
    {
      "href": "https://images-assets.nasa.gov/image/PIA04591/collection.json",
      "title": "Valles Marineris Hemisphere Enhanced",
      "description": "Valles Marineris Hemisphere Enhanced",
      "date_created": "2000-06-03T13:00:00Z",
      "media_type": "image",
      "nasa_id": "PIA04591",
      "keywords": ["Mars", "Viking"],
      "images": [
        {
          "href": "https://images-assets.nasa.gov/image/PIA04591/PIA04591~thumb.jpg",
          "rel": "preview",
          "width": 200,
          "height": 200
        }
      ],
      "preview": {
        "href": "https://images-assets.nasa.gov/image/PIA04591/PIA04591~thumb.jpg",
        "rel": "preview",
        "width": 200,
        "height": 200
      }
    }
  ]
}
```
