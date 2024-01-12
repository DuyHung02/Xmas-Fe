import React from 'react';
import { connect } from 'react-redux';
import BlankLayout from '../BlankLayout';
import { Navigate, Outlet } from 'react-router-dom';

const NonAuthorizedLayout = ({ tokenState }) => {
  if (tokenState) {
    return <Navigate to={'/'} replace />;
  }

  return (
    <BlankLayout>
      <Outlet />
    </BlankLayout>
  );
};

const mapStateToProps = ({ auth }) => ({
  tokenState: auth?.token,
});

export default connect(mapStateToProps)(NonAuthorizedLayout);
