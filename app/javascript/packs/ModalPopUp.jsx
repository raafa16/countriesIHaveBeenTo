import React from "react";
import { Modal, Button, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

class ModalPopUp extends React.Component {
  constructor(props) {
    super(props);
    this.handleMarkAsVisited = this.handleMarkAsVisited.bind(this);
    this.handleUnmarkAsVisited = this.handleUnmarkAsVisited.bind(this);
  }

  handleMarkAsVisited() {
    this.props.markAsVisited(this.props.name, this.props.iso_a3);
  }

  handleUnmarkAsVisited() {
    this.props.unmarkAsVisited(this.props.id);
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
        <Modal.Header style={{ display: "flex" }} closeButton>
          <Modal.Title id="contained-modal-title-vcenter">{name}</Modal.Title>
          <Image
            roundedCircle
            fluid
            style={{ width: "34px", height: "34px", marginLeft: "0.5rem" }}
            src={`https://www.countryflags.io/${iso_a2}/shiny/64.png`}
          />
        </Modal.Header>
        <Modal.Body
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {loggedIn &&
            (visited ? (
              <Button variant="dark" onClick={this.handleUnmarkAsVisited}>
                <FontAwesomeIcon icon={faMapMarkerAlt} /> Unmark as visited
              </Button>
            ) : (
              <Button variant="dark" onClick={this.handleMarkAsVisited}>
                <FontAwesomeIcon icon={faMapMarkerAlt} /> Mark as visited
              </Button>
            ))}
          <Button variant="dark">
            <FontAwesomeIcon icon={faEye} /> See 353 memories
          </Button>
        </Modal.Body>
      </Modal>
    );
  }
}

export default ModalPopUp;
