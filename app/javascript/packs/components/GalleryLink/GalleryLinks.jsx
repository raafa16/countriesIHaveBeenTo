import React from "react";
import PropTypes from "prop-types";

class GalleryLinks extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Gallery Links</th>
                <th scope="col" className="text-right"></th>
              </tr>
            </thead>
            <tbody>{this.props.children}</tbody>
          </table>
        </div>
      </>
    );
  }
}
export default GalleryLinks;

GalleryLinks.propTypes = {
  children: PropTypes.array.isRequired,
};
