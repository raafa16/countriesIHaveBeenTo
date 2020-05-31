import React from "react";
import PropTypes from "prop-types";

class GalleryLink extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { galleryLink } = this.props;
    return (
      <tr>
        <td>
          <input
            type="text"
            defaultValue={galleryLink.title}
            className="form-control"
            id={`galleryLink__title-${galleryLink.id}`}
          />
        </td>
        <td className="text-right">
          <div className="form-check form-check-inline">
            <input
              type="boolean"
              type="checkbox"
              className="form-check-input"
              id={`complete-${galleryLink.id}`}
            />
            <label
              className="form-check-label"
              htmlFor={`complete-${galleryLink.id}`}
            >
              Complete?
            </label>
          </div>
          <button className="btn btn-outline-danger">Delete</button>
        </td>
      </tr>
    );
  }
}

export default GalleryLink;

GalleryLink.propTypes = {
  galleryLink: PropTypes.object.isRequired,
};
