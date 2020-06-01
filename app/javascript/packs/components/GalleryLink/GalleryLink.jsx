import React from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import setAxiosHeaders from "../AxiosHeaders";

class GalleryLink extends React.Component {
  constructor(props) {
    super(props);
    this.handleDestroy = this.handleDestroy.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateGalleryLink = this.updateGalleryLink.bind(this);
    this.galleryLinkRef = React.createRef();
  }

  handleDestroy() {
    const { galleryLink } = this.props;
    setAxiosHeaders();
    const confirmation = confirm("Are you sure?");
    if (confirmation) {
      axios
        .delete(
          `/api/v1/visited_countries/${galleryLink.visited_country_id}/gallery_links/${galleryLink.id}`
        )
        .then((response) => {
          this.props.getGalleryLinks();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  handleChange() {
    this.updateGalleryLink();
  }

  updateGalleryLink() {
    const { galleryLink } = this.props;
    setAxiosHeaders();
    axios
      .put(
        `/api/v1/visited_countries/${galleryLink.visited_country_id}/gallery_links/${galleryLink.id}`,
        {
          gallery_link: {
            link: this.galleryLinkRef.current.value,
          },
        }
      )
      .then((response) => {
        this.props.getGalleryLinks();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    const { galleryLink, loggedIn } = this.props;
    return (
      <tr>
        <td>
          <Form.Control
            id={`${galleryLink.id}`}
            name="galleryLink"
            ref={this.galleryLinkRef}
            type="url"
            disabled={!loggedIn}
            onChange={this.handleChange}
            defaultValue={galleryLink.link}
            placeholder="Add the link to your gallery here..."
            required
          />
        </td>
        <td
          className="text-right"
          style={{ display: "flex", justifyContent: "space-evenly" }}
        >
          <Button
            variant="outline-success"
            href={galleryLink.link}
            target="_blank"
          >
            <FontAwesomeIcon icon={faExternalLinkAlt} />
          </Button>
          {loggedIn && (
            <Button variant="outline-danger" onClick={this.handleDestroy}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </Button>
          )}
        </td>
      </tr>
    );
  }
}

export default GalleryLink;

GalleryLink.propTypes = {
  galleryLink: PropTypes.object.isRequired,
};
