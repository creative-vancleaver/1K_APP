import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OpenSeaDragon from 'openseadragon';

const DeepZoom = () => {
  const [geojsonData, setGeojsonData] = useState(null);
  const [viewer, setViewer] = useState(null);

  useEffect(() => {
    axios.get('get_geojson/')
    .then((response) => {
      setGeojsonData(response.data);
    })
    .catch((error) => console.error('Error with geojson: ', error));
  }, []);

  useEffect(() => {
    if (geojsonData && viewer) {
      geojsonData.features.forEach((feature) => {
        const type = feature.geometry.type;
        const coordinates = feature.geometry.coordinates;

        // CONVET GEOGRPAHICAL COORDINATES TO PIXEL COORDINATES
        const pixelCoordinates = coordinates.map((coordinate) => {
          const { x, y } = viewer.viewport.viewportToImageCoordinates(
            coordinate[0], // LONGITDUE
            coordinate[1] // LATITUDE
          );
          return { x , y };
        });

        // CREATE OVERLAYS BASED ON FEATURE TYPE
        if (type == 'Polygon') {
          const polygon = new OpenSeaDragon.Rect(viewer.world, pixelCoordinates);
          // CUSTOMIZE APPEARANCE OF POLYGON IF NEEDED
          viewer.addOverlay(polygon);
        } else if (type == 'Point') {
          const point = new OpenSeaDragon.Point(viewer.world, pixelCoordinates[0]);
          viewer.addOverlay(point);
        } else if (type == 'LineString') {
          const line = new OpenSeaDragon.Path(viewer.world, {
            points: pixelCoordinates,
            strokeColor: 'blue', // CUSTOMIZE LINE COLOR
            strokeWidth: 2, // CUSTOMIZE LINE WIDTH
          });
          viewer.addOverlay(line);
        }
      })
    }
  }, [geojsonData, viewer]);

  useEffect(() => {
    const osdViewer = OpenSeaDragon({
      id: 'world_container',
    });
    setViewer(osdViewer);
  }, []);

  return (
    <div id='world_container' style={{ width: '100%', height: '600px'}}></div>
  )
}

export default DeepZoom