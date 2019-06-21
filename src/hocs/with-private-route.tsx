import * as React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {compose} from "recompose";


interface IProps {
  userId: number;
  needAuth: boolean;
}

function withPrivateRoute<T>(Component: React.ComponentType<T>): React.FunctionComponent<IProps & T> {
  const WithPrivateRoute: React.FC<IProps & T> = (props): React.ReactElement => {
    const {userId, needAuth} = props;
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
}

const mapStateToProps = (state, ownProps): void => ({
  ...ownProps,
  userId: state.authorization.user.id,
  needAuth: state.authorization.needAuth
});

const composedWithPrivateRoute = compose(
  connect(mapStateToProps, null),
  withPrivateRoute
);

export {withPrivateRoute};

export default composedWithPrivateRoute;
