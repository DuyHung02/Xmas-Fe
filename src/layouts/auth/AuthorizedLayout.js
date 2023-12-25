import React from 'react';
import { connect } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import DefaultLayout from '../DefaultLayout';

const NonAuthorizedLayout = ({ tokenState }) => {
  if (!tokenState) {
    return <Navigate to={'/login'} replace />;
  }

  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  );
};

const mapStateToProps = ({ auth }) => ({
  tokenState: auth.token,
});

export default connect(mapStateToProps)(NonAuthorizedLayout);
