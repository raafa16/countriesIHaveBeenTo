import React, { memo } from "react";
import {
  ZoomableGroup,
  Graticule,
  Sphere,
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-50m-simplified.json";

const MapChart = ({ setTooltipContent }) => {
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   csv(`/vulnerability.csv`).then((data) => {
  //     setData(data);
  //   });
  // }, []);

  return (
    <>
      <ComposableMap
        // width={1920}
        // height={1080}
        data-tip=""
        projectionConfig={{
          rotate: [-10, 0, 0],
          scale: 147,
        }}
      >
        {/* <ZoomableGroup zoom={1}> */}
        {/* <Sphere stroke="#FF5533" strokeWidth={2} /> */}

        <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
        <Graticule stroke="#E4E5E6" strokeWidth={0.5} />

        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const { NAME, ISO_A3 } = geo.properties;
              const d = "USA" == ISO_A3;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    console.log(NAME);
                    setTooltipContent(`${NAME}`);
                  }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  style={
                    d
                      ? {
                          default: {
                            fill: "#F53",
                            outline: "none",
                          },
                          hover: {
                            fill: "#F53",
                            outline: "none",
                          },
                          pressed: {
                            fill: "#E42",
                            outline: "none",
                          },
                        }
                      : {
                          default: {
                            fill: "#D6D6DA",
                            outline: "none",
                          },
                          hover: {
                            fill: "#F53",
                            outline: "none",
                          },
                          pressed: {
                            fill: "#E42",
                            outline: "none",
                          },
                        }
                  }
                />
              );
            })
          }
        </Geographies>
        {/* </ZoomableGroup> */}
      </ComposableMap>
    </>
  );
};

export default memo(MapChart);
