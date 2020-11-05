import React, { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getAuthUser } from "service/account/operations";
import { Layout } from "@/components/global";

const AdminLoginAsUser = (routerProps) => {
  const router = useRouter();
  const { authUser, getAuthUser } = routerProps;
  const { admin_token, adminshop_id } = router.query;
  const [auth_user, setAuthUser] = useState({});

  /** loacal storage used for setting the token from url for the admin to login as user */
  // localStorage.setItem("auth-token", admin_token);
  useEffect(() => {
    localStorage.setItem("auth-token", admin_token);
  }, []);

  /** UseEffect : Here we are calling the auth api again for admin to login as user. */
  useEffect(() => {
    let token = localStorage.getItem("auth-token");
    if (token && Object.keys(authUser).length === 0) {
      getAuthUser();
    }
  }, [authUser, auth_user]);

  /** Redirection path for the admin directly to the dashboard as he gets authenticated for login as user */
  if (Object.keys(authUser).length > 0) {
    routerProps.history.push(`/dashboard/${adminshop_id}`);
   localStorage.setItem("auth-user", JSON.stringify(authUser));
  }

  return (
    <Layout>
      <div>
        <h1>Loading the data....</h1>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  authUser: state.account.auth_user,
});
const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    getAuthUser: () => {
      getAuthUser(dispatch);
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AdminLoginAsUser);
