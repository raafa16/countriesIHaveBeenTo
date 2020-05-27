import React from "react";
import { Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

class TooltipPopUp extends React.Component {
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
          {this.props.loggedIn && (
            <Button
              variant="dark"
              style={{
                fontSize: "10px",
              }}
            >
              <FontAwesomeIcon icon={faMapMarkerAlt} /> Mark as visited
            </Button>
          )}
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
