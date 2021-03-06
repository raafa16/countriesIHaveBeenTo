import React, { memo } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import axios from "axios";
import setAxiosHeaders from "../AxiosHeaders";
import { scaleLinear } from "d3-scale";
import {
  Graticule,
  Sphere,
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import ModalPopUp from "../../components/Modal/ModalPopUp";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-50m-simplified.json";

const colorScale = scaleLinear().domain([0, 10]).range(["#03B3B3", "#016d6d"]);

class MapChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      visitedCountries: [],
      modalShow: false,
      selectedCountry: {
        id: null,
        name: "",
        iso_a2: "",
        iso_a3: "",
        visited: false,
      },
    };
    this.getVisitedCountries = this.getVisitedCountries.bind(this);
    this.getLoggedInStatus = this.getLoggedInStatus.bind(this);
    this.markAsVisited = this.markAsVisited.bind(this);
    this.unmarkAsVisited = this.unmarkAsVisited.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
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

  markAsVisited(name, iso_a2, iso_a3) {
    setAxiosHeaders();
    axios
      .post("/api/v1/visited_countries", {
        visited_country: {
          name: name,
          iso_a2: iso_a2,
          iso_a3: iso_a3,
        },
      })
      .then((response) => {
        const visitedCountry = response.data;
        const visitedCountries = [
          visitedCountry,
          ...this.state.visitedCountries,
        ];

        this.setState({
          visitedCountries,
          selectedCountry: {
            id: visitedCountry.id,
            name: visitedCountry.name,
            iso_a2: visitedCountry.iso_a2,
            iso_a3: visitedCountry.iso_a3,
            visited: true,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  unmarkAsVisited(id, name, iso_a2, iso_a3) {
    setAxiosHeaders();
    axios
      .delete(`/api/v1/visited_countries/${id}`)
      .then((response) => {
        this.setState(
          {
            selectedCountry: {
              id: null,
              name: name,
              iso_a2: iso_a2,
              iso_a3: iso_a3,
              visited: false,
            },
          },
          () => {
            this.getVisitedCountries();
          }
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  showModal(id = null, name, iso_a2, iso_a3, visited) {
    this.setState({
      modalShow: true,
      selectedCountry: {
        id: id,
        name: name,
        iso_a2: iso_a2,
        iso_a3: iso_a3,
        visited: visited,
      },
    });
  }

  hideModal() {
    this.setState({
      modalShow: false,
    });
  }

  render() {
    const { setTooltipContent } = this.props;
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
                const { NAME, ISO_A2, ISO_A3 } = geo.properties;
                const visitedCountry = this.state.visitedCountries.find((vc) =>
                  _.isEqual(vc.iso_a3, geo.properties.ISO_A3)
                );
                const visited = !_.isEmpty(visitedCountry);

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {
                      setTooltipContent("");
                      setTooltipContent(`${NAME}`);
                    }}
                    onClick={() => {
                      setTooltipContent("");
                      this.showModal(
                        visited ? visitedCountry.id : null,
                        NAME,
                        ISO_A2,
                        ISO_A3,
                        visited
                      );
                    }}
                    onMouseLeave={() => {
                      setTooltipContent("");
                    }}
                    style={
                      visited
                        ? {
                            default: {
                              fill: !_.isEmpty(visitedCountry.gallery_links)
                                ? colorScale(
                                    visitedCountry.gallery_links.length
                                  )
                                : "#03B3B3",
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
        <ModalPopUp
          show={this.state.modalShow}
          hide={this.hideModal}
          id={this.state.selectedCountry.id}
          name={this.state.selectedCountry.name}
          iso_a2={this.state.selectedCountry.iso_a2}
          iso_a3={this.state.selectedCountry.iso_a3}
          visited={this.state.selectedCountry.visited}
          markAsVisited={this.markAsVisited}
          unmarkAsVisited={this.unmarkAsVisited}
          loggedIn={this.state.loggedIn}
        />
      </>
    );
  }
}

export default memo(MapChart);

MapChart.propTypes = {
  setTooltipContent: PropTypes.func.isRequired,
};
