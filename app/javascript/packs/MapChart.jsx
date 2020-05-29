import React, { memo } from "react";
import _ from "lodash";
import axios from "axios";
import setAxiosHeaders from "./AxiosHeaders";
import {
  Graticule,
  Sphere,
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import ModalPopUp from "./ModalPopUp";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-50m-simplified.json";

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

  markAsVisited(name, iso_a3) {
    setAxiosHeaders();
    axios
      .post("/api/v1/visited_countries", {
        visited_country: {
          name: name,
          iso_a3: iso_a3,
        },
      })
      .then((response) => {
        const visitedCountry = response.data;
        let visitedCountries = _.cloneDeep(this.state.visitedCountries);
        visitedCountries.push(visitedCountry);
        this.setState(
          {
            visitedCountries,
            modalShow: false,
          },
          () => {
            console.log(this.state);
          }
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  unmarkAsVisited(id) {
    setAxiosHeaders();
    axios
      .delete(`/api/v1/visited_countries/${id}`)
      .then((response) => {
        this.setState(
          {
            modalShow: false,
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

  showModal(id = null, name, iso_a3, visited) {
    this.setState({
      modalShow: true,
      selectedCountry: {
        id: id,
        name: name,
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
                const { NAME, ISO_A3 } = geo.properties;
                const visited = this.state.visitedCountries.find((vc) =>
                  _.isEqual(vc.iso_a3, geo.properties.ISO_A3)
                );

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
                        visited ? visited.id : null,
                        NAME,
                        ISO_A3,
                        visited
                      );
                    }}
                    style={
                      visited
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
        <ModalPopUp
          show={this.state.modalShow}
          hide={this.hideModal}
          id={this.state.selectedCountry.id}
          name={this.state.selectedCountry.name}
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
