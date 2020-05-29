import React from "react";
import { Modal, Button } from "react-bootstrap";
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
    return (
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={this.props.show}
        onHide={this.props.hide}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {this.props.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {this.props.loggedIn &&
            (this.props.visited ? (
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
