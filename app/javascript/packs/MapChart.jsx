import React, { memo } from "react";
import {
  Graticule,
  Sphere,
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import TooltipPopUp from "./TooltipPopUp";

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
        width={900}
        height={400}
        data-tip=""
        projectionConfig={{
          rotate: [-10, 0, 0],
          scale: 147,
        }}
      >
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
                    setTooltipContent(`${NAME}`);
                  }}
                  onClick={() => {
                    setTooltipContent(<TooltipPopUp name={NAME} />);
                  }}
                  // onMouseLeave={() => {
                  //   setTooltipContent("");
                  // }}
                  style={
                    d
                      ? {
                          default: {
                            fill: "#03B3B3",
                            outline: "none",
                          },
                          hover: {
                            fill: "#F53",
                            outline: "none",
                            cursor: "pointer",
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
                            cursor: "pointer",
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
      </ComposableMap>
    </>
  );
};

export default memo(MapChart);
