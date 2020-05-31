import React from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import setAxiosHeaders from "./AxiosHeaders";

class GalleryLink extends React.Component {
  constructor(props) {
    super(props);
    this.handleDestroy = this.handleDestroy.bind(this);
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
  render() {
    const { galleryLink, loggedIn } = this.props;
    return (
      <tr>
        <td>
          <Form.Control
            id={`galleryLink__title-${galleryLink.id}`}
            name="link"
            ref={this.linkRef}
            type="text"
            disabled={!loggedIn}
            defaultValue={galleryLink.link}
            placeholder="Add the link to your gallery here..."
            required
          />
        </td>
        <td className="text-right">
          <Button variant="dark" onClick={this.handleDestroy}>
            <FontAwesomeIcon icon={faTrashAlt} />
          </Button>
        </td>
      </tr>
    );
  }
}

export default GalleryLink;

GalleryLink.propTypes = {
  galleryLink: PropTypes.object.isRequired,
};
