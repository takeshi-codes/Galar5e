import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../Auth';

const PrivateRoute = ({ component: RouteComponent, appProps, ...rest }) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(routeProps) => (currentUser === null ? (
        <Redirect to="/login" />
      ) : (
        <RouteComponent {...routeProps} {...appProps} />
      ))}
    />
  );
};

export default PrivateRoute;
