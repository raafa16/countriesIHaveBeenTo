import React from "react";
import PropTypes from "prop-types";
import { Button, Col, Form } from "react-bootstrap";
import axios from "axios";
import setAxiosHeaders from "./AxiosHeaders";

class GalleryLink extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.linkRef = React.createRef();
  }

  handleSubmit(e) {
    e.preventDefault();
    setAxiosHeaders();
    axios
      .post(`/api/v1/${this.props.visited_country_id}/gallery_links`, {
        gallery_link: {
          link: this.linkRef.current.value,
        },
      })
      .then((response) => {
        const galleryLink = response.data;
        this.props.createGalleryLink(galleryLink);
      })
      .catch((error) => {
        console.log(error);
      });
    e.target.reset();
  }

  render() {
    return (
      <Form
        onSubmit={this.handleSubmit}
        style={{ width: "100%", margin: "0 auto" }}
      >
        <Form.Row>
          <Form.Group as={Col} md="8">
            <Form.Control
              id="link"
              name="link"
              type="text"
              placeholder="Add the link to your gallery here..."
              required
            />
            <Form.Control.Feedback type="invalid">
              Please input a valid gallery link.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4">
            <Button variant="dark">Add gallery link</Button>
          </Form.Group>
        </Form.Row>
      </Form>
    );
  }
}

export default GalleryLink;

GalleryLink.propTypes = {
  createGalleryLink: PropTypes.func.isRequired,
};