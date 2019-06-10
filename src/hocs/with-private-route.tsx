import * as React from 'react';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "recompose";


const withPrivateRoute = (Component) => {
  interface IProps {
    userId: number,
    needAuth: boolean
  };
  const WithPrivateRoute: React.FC<IProps> = (props) => {
    const { userId, needAuth } = props;
    const isAutharisation = Boolean(userId);

    return isAutharisation && !needAuth ? (
      <Component
        {...props}
      />
    ) : (
        <Redirect to="/login" />
      );
  };


  return WithPrivateRoute;
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  userId: state.authorization.user.id,
  needAuth: state.authorization.needAuth
});

const composedWithPrivateRoute = compose(
  connect(mapStateToProps, null),
  withPrivateRoute
);

export { withPrivateRoute };

export default composedWithPrivateRoute;
