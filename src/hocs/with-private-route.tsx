import * as React from 'react';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "recompose";


const withPrivateRoute = (Component) => {
  interface IProps {
    userId: number
  };
  const WithPrivateRoute: React.FC<IProps> = (props) => {
    const { userId } = props;
    const isAutharisation = Boolean(userId);

    return isAutharisation ? (
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
});

const composedWithPrivateRoute = compose(
  connect(mapStateToProps, null),
  withPrivateRoute
);

export { withPrivateRoute };

export default composedWithPrivateRoute;
