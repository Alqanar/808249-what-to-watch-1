import * as React from "react";
import {Link} from "react-router-dom";


interface IProps {
  className?: string;
  hrefLink?: string;
}

const CustomLink = ({className, children}): React.ReactElement => {
  return (
    <a className={className}>
      {children}
    </a>
  );
};

const Logo: React.FC<IProps> = (props): React.ReactElement => {
  const {className = ``, hrefLink = `#`} = props;
  const LinkType = hrefLink === `#` ? CustomLink : Link;

  return (
    <div className="logo">
      <LinkType to={hrefLink} className={`logo__link ${className}`}>
              <>
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </>
      </LinkType>
    </div>
  );
};

export default Logo;
