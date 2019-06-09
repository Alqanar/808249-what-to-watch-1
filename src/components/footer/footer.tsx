import * as React from "react";

import Logo from "../logo/logo";


interface IProps {
  hrefLink?: string
};

const Footer: React.FC<IProps> = (props) => {
  const { hrefLink = `#` } = props;

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

export default Footer;
