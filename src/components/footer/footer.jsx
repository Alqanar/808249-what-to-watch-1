import React from "react";
import PropTypes from "prop-types";

import Logo from "../logo/logo.jsx";


const Footer = (props) => {
  const {hrefLink} = props;

  return (
    <footer className="page-footer">
      <Logo
        className="logo__link--light"
        hrefLink={hrefLink}
      />

      <div className="copyright">
        <p>© 2019 What to watch Ltd.</p>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  hrefLink: PropTypes.string
};

Footer.defaultProps = {
  hrefLink: `#`
};

export default Footer;
