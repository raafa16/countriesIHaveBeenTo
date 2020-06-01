import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkedAlt, faMap } from "@fortawesome/free-solid-svg-icons";
import GalleryLinks from "../../components/GalleryLink/GalleryLinks";
import GalleryLink from "../../components/GalleryLink/GalleryLink";
import GalleryLinkForm from "../../components/GalleryLink/GalleryLinkForm";
import { Modal, Button, Image } from "react-bootstrap";

class ModalPopUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      galleryLinks: [],
    };
    this.handleMarkAsVisited = this.handleMarkAsVisited.bind(this);
    this.handleUnmarkAsVisited = this.handleUnmarkAsVisited.bind(this);
    this.getGalleryLinks = this.getGalleryLinks.bind(this);
    this.createGalleryLink = this.createGalleryLink.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id && this.props.id) this.getGalleryLinks();
  }

  getGalleryLinks() {
    axios
      .get(`/api/v1/visited_countries/${this.props.id}/gallery_links`)
      .then((response) => {
        const galleryLinks = response.data;
        this.setState({
          galleryLinks: galleryLinks,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  createGalleryLink(galleryLink) {
    const galleryLinks = [galleryLink, ...this.state.galleryLinks];
    this.setState({ galleryLinks });
  }

  handleMarkAsVisited() {
    this.props.markAsVisited(
      this.props.name,
      this.props.iso_a2,
      this.props.iso_a3
    );
  }

  handleUnmarkAsVisited() {
    this.props.unmarkAsVisited(
      this.props.id,
      this.props.name,
      this.props.iso_a2,
      this.props.iso_a3
    );
  }

  render() {
    const { show, hide } = this.props;
    const { id, name, loggedIn, iso_a2, visited } = this.props;
    return (
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        restoreFocus={false}
        centered
        show={show}
        onHide={hide}
      >
        <Modal.Header
          style={{ display: "flex", justifyContent: "center" }}
          closeButton
        >
          <Modal.Title id="contained-modal-title-vcenter">{name}</Modal.Title>
          <Image
            roundedCircle
            fluid
            style={{ width: "34px", height: "34px", marginLeft: "0.5rem" }}
            src={`https://www.countryflags.io/${iso_a2}/shiny/64.png`}
          />
        </Modal.Header>
        {loggedIn &&
          (visited ? (
            <Modal.Body style={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="outline-dark"
                onClick={this.handleUnmarkAsVisited}
              >
                <FontAwesomeIcon icon={faMap} /> Unmark as visited
              </Button>
            </Modal.Body>
          ) : (
            <Modal.Body style={{ display: "flex", justifyContent: "center" }}>
              <Button variant="outline-dark" onClick={this.handleMarkAsVisited}>
                <FontAwesomeIcon icon={faMapMarkedAlt} /> Mark as visited
              </Button>
            </Modal.Body>
          ))}
        {visited && (
          <Modal.Footer style={{ display: "flex", justifyContent: "center" }}>
            {loggedIn ? (
              <GalleryLinkForm
                createGalleryLink={this.createGalleryLink}
                visitedCountryId={id}
              />
            ) : (
              ""
            )}
            {!_.isEmpty(this.state.galleryLinks) ? (
              <GalleryLinks>
                {this.state.galleryLinks.map((galleryLink) => (
                  <GalleryLink
                    key={galleryLink.id}
                    galleryLink={galleryLink}
                    loggedIn={loggedIn}
                    getGalleryLinks={this.getGalleryLinks}
                  />
                ))}
              </GalleryLinks>
            ) : (
              ""
            )}
          </Modal.Footer>
        )}
      </Modal>
    );
  }
}

export default ModalPopUp;

ModalPopUp.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string.isRequired,
  iso_a2: PropTypes.string.isRequired,
  iso_a3: PropTypes.string.isRequired,
  visited: PropTypes.bool,
  loggedIn: PropTypes.bool.isRequired,
  show: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
  markAsVisited: PropTypes.func.isRequired,
  unmarkAsVisited: PropTypes.func.isRequired,
};
