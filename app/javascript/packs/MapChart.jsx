import React, { memo } from "react";
import axios from "axios";
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

class MapChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      visitedCountries: [],
    };
    this.getVisitedCountries = this.getVisitedCountries.bind(this);
    this.getLoggedInStatus = this.getLoggedInStatus.bind(this);
  }

  componentDidMount() {
    this.getLoggedInStatus();
    this.getVisitedCountries();
  }

  getLoggedInStatus() {
    axios
      .get("/api/v1/logged_in?")
      .then((response) => {
        const loggedIn = response.data.logged_in;
        this.setState({ loggedIn });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getVisitedCountries() {
    axios
      .get("/api/v1/visited_countries")
      .then((response) => {
        const visitedCountries = response.data;
        this.setState({ visitedCountries });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { setTooltipCondition, setTooltipContent } = this.props;
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
                      setTooltipCondition(false);
                      setTooltipContent("");
                      setTooltipContent(`${NAME}`);
                    }}
                    onClick={() => {
                      setTooltipCondition(true);
                      setTooltipContent("");
                      setTooltipContent(
                        <TooltipPopUp
                          name={NAME}
                          loggedIn={this.state.loggedIn}
                        />
                      );
                    }}
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
  }
}

export default memo(MapChart);
