import React from 'react';
import PropTypes from "prop-types";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {compose} from "recompose";


const withPrivateRoute = (Component) => {
  const WithPrivateRoute = (props) => {
    const {userId} = props;
    const isAutharisation = Boolean(userId);

    return isAutharisation ? (
      <Component
        {...props}
      />
    ) : (
      <Redirect to="/login" />
    );
  };

  WithPrivateRoute.propTypes = {
    userId: PropTypes.number
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

export {withPrivateRoute};

export default composedWithPrivateRoute;
