import _ from "lodash";
import React from "react";
import { Modal, Button, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkedAlt, faMap } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";

import GalleryLinks from "./GalleryLinks";
import GalleryLink from "./GalleryLink";
import GalleryLinkForm from "./GalleryLinkForm";

class ModalPopUp extends React.Component {
  constructor(props) {
    super(props);
    this.handleMarkAsVisited = this.handleMarkAsVisited.bind(this);
    this.handleUnmarkAsVisited = this.handleUnmarkAsVisited.bind(this);
    this.state = {
      galleryLinks: [],
    };
    // this.getGalleryLinks = this.getGalleryLinks.bind(this);
    this.createGalleryLink = this.createGalleryLink.bind(this);
  }

  createGalleryLink(galleryLink) {
    const galleryLinks = [galleryLinks, ...this.state.galleryLinks];
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
    const { name, loggedIn, iso_a2, visited } = this.props;
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
        <Modal.Body style={{ display: "flex", justifyContent: "center" }}>
          {loggedIn &&
            (visited ? (
              <Button variant="dark" onClick={this.handleUnmarkAsVisited}>
                <FontAwesomeIcon icon={faMap} /> Unmark as visited
              </Button>
            ) : (
              <Button variant="dark" onClick={this.handleMarkAsVisited}>
                <FontAwesomeIcon icon={faMapMarkedAlt} /> Mark as visited
              </Button>
            ))}
        </Modal.Body>
        {visited && (
          <Modal.Footer style={{ display: "flex", justifyContent: "center" }}>
            <GalleryLinkForm createGalleryLink={this.createGalleryLink} />
            {!_.isEmpty(this.state.galleryLinks) ? (
              <GalleryLinks>
                {this.state.galleryLinks.map((galleryLink) => (
                  <galleryLink key={galleryLink.id} galleryLink={galleryLink} />
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
