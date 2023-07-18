import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Layer, Source, MapRef, Marker } from "react-map-gl";
import React, {useRef, useState } from "react";
import { cellToBoundary } from "h3-js";



function MapBox() {

    const singaporeHexagonsObj = require('../data/singapore_hexagons_count.json');
    const [singaporeHexagonsArr, setSingaporeHexagonsArr] = useState([]);

    const onLoad = () => {
        const singaporeHexagonsArr = [];

        for (const hexagon in singaporeHexagonsObj) {
            singaporeHexagonsArr.push({
              hexindex7: hexagon,
              bookingCount: singaporeHexagonsObj[hexagon]
            });
        }

        console.log(singaporeHexagonsArr);

        const rs = singaporeHexagonsArr.map((row) => {
            const style = getRandomStyle(row);
            return {
              type: "Feature",
              properties: {
                color: style.color,
                opacity: style.opacity,
                id: row.hexindex7,
              },
              geometry: {
                type: "Polygon",
                coordinates: [cellToBoundary(row.hexindex7, true)],
              },
            };
        });
        setSingaporeHexagonsArr(rs);
        
    };

    const getRandomStyle = (row) => {
        const styles = [
            {
              color: '#FEDD87',
              opacity: 0.2
            },
            {
              color: '#FED976',
              opacity: 0.4
            },
            {
              color: "#FC9653",
              opacity: 0.6,
            },
            {
              color: "#F77645",
              opacity: 0.7
            },
            {
              color: "#E14C48",
              opacity: 0.8
            }
          ];

          return styles[(Math.floor(Math.random()*styles.length))];
    }

    const getStyle = (row) => {

        // console.log(row);
    
        const styles = [
          {
            color: '#FEDD87',
            opacity: 0.2
          },
          {
            color: '#FED976',
            opacity: 0.4
          },
          {
            color: "#FC9653",
            opacity: 0.6,
          },
          {
            color: "#F77645",
            opacity: 0.7
          },
          {
            color: "#E14C48",
            opacity: 0.8
          }
        ];
    
    
        if (Number(row.bookingCount) === 0) {
          return {opacity: 0};
        }
    
        if (Number(row.bookingCount) < 250) {
          return styles[0];
        }
        if (Number(row.bookingCount) < 500) {
          return styles[1];
        }
        if (Number(row.bookingCount) < 1000) {
          return styles[2];
        }
        if (Number(row.bookingCount) < 1500) {
          return styles[3];
        }
        return styles[4];
    };
  
    return (
      
        <div>
          <div className="map">
            <Map
              initialViewState={{
                latitude: 1.290270,
                longitude: 103.851959,
                zoom: 10,
                bearing: 0,
                pitch: 0,
              }}
              mapStyle="mapbox://styles/mapbox/light-v9"
              mapboxAccessToken="pk.eyJ1IjoidGhlcHJvZiIsImEiOiJja3Q5amlqaXgxNjUwMm5wY3NrdmplbzVxIn0.C3zhU7lekidOJmARhNyBdw"
              style={{
                height: "100vh",
                width: "100vw",
              }}
              onLoad={onLoad}
            >
              <Source
                type="geojson"
                data={{
                  type: "FeatureCollection",
                  features: singaporeHexagonsArr
                }}
              >
                <Layer
                  {...{
                    id: "polyline-layer",
                    type: "fill",
                    paint: {
                      'fill-outline-color': 'white',
                      "fill-color": ["get", "color"],
                      "fill-opacity": ["get", "opacity"],
                    },
                  }}
                />
              </Source>
              
  
  
            </Map>
          </div> 
        </div>
    );
  
};
  
export default MapBox;