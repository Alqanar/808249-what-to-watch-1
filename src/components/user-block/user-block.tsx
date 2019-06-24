import * as React from "react";
import {Link} from "react-router-dom";


interface IProps {
  avatarLink: string;
  isAuth: boolean;
  hrefLink?: string;
}

const CustomLink = ({children}): React.ReactElement => {
  return (
    <a>
      {children}
    </a>
  );
};

const avatarBlock = (avatarLink, hrefLink = `/mylist`): React.ReactElement => {
  const LinkType = hrefLink === `/mylist` ? Link : CustomLink;

  return (
    <div className="user-block__avatar">
      <LinkType to={hrefLink}>
        <img src={avatarLink} alt="User avatar" width="63" height="63" />
      </LinkType>
    </div>
  );
};

const signInLink = (): React.ReactElement => (
  <Link to='/login' className="user-block__link">Sign in</Link>
);

const UserBlock: React.FC<IProps> = (props): React.ReactElement => {
  const {avatarLink, isAuth, hrefLink} = props;

  return (
    <div className="user-block">
      {isAuth ? avatarBlock(avatarLink, hrefLink) : signInLink()}
    </div>
  );
};

export default UserBlock;
