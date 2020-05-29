import React from "react";
import { Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

class TooltipPopUp extends React.Component {
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
      <Card style={{ width: "18rem", color: "#212529" }}>
        {/* <Card.Img
          variant="top"
          src="https://thumbs.dreamstime.com/b/dream-vacation-ahead-22868361.jpg"
        /> */}
        <Card.Body>
          <Card.Title>{this.props.name}</Card.Title>
          <Card.Title>{this.props.loggedIn}</Card.Title>
        </Card.Body>
        <Card.Body
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {this.props.loggedIn &&
            (this.props.visited ? (
              <Button
                variant="dark"
                style={{
                  fontSize: "10px",
                }}
                onClick={this.handleUnmarkAsVisited}
              >
                <FontAwesomeIcon icon={faMapMarkerAlt} /> Unmark as visited
              </Button>
            ) : (
              <Button
                variant="dark"
                style={{
                  fontSize: "10px",
                }}
                onClick={this.handleMarkAsVisited}
              >
                <FontAwesomeIcon icon={faMapMarkerAlt} /> Mark as visited
              </Button>
            ))}
          <Button
            variant="dark"
            style={{
              fontSize: "10px",
            }}
          >
            <FontAwesomeIcon icon={faEye} /> See 353 memories
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

export default TooltipPopUp;
