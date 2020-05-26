import React from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";

function TooltipPopUp(props) {
  const { name } = props;

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src="https://thumbs.dreamstime.com/b/dream-vacation-ahead-22868361.jpg"
      />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem>Cras justo odio</ListGroupItem>
        <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
        <ListGroupItem>Vestibulum at eros</ListGroupItem>
      </ListGroup>
      <Card.Body>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body>
    </Card>
  );
}

export default TooltipPopUp;
