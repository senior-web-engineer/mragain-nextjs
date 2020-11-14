import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { message } from "antd";
import "./bevestig-je-wachtwoord-reset.less";
import { resetPasswordConfirmEmail } from "Service/account/operations.js";
import { resetAuthError } from "Service/account/action.js";
import { Layout } from "@/components/global";

function PasswordResetConfirm(routerProps) {
  const [validated, setValidated] = React.useState(false);
  const [isload, setLoad] = React.useState(false);
  const [uid64, setUid] = React.useState("");
  const [token, setToken] = React.useState("");
  const router = useRouter();

  const {
    resetPasswordConfirmEmail,
    resetAuthError,
    isAuth_Error,
    auth_error,
    location,
  } = routerProps;

  useEffect(() => {
    if (isload === false) {
      let tmp = router.pathname;
      console.log(router.pathname)
      setUid(tmp[2]);
      setToken(tmp[3]);
      setLoad(true);
    }
  })

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      const data = new FormData(event.target);

      setValidated(true);
      let ret = await resetPasswordConfirmEmail({
        new_password1: data.get("password"),
        new_password2: data.get("confirmpassword"),
        uid: uid64,
        token: token,
      });
      if (ret === true) {
        message.success("Je wachtwoord is succesvol gewijzigd");
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      }
    }
  };

  useEffect(() => {
    if (isAuth_Error === true) {
      message.error(auth_error, [2]);
      setTimeout(() => {
        resetAuthError();
      }, 2000);
    }
  });

  return (
    <Layout>
      <div className="user-login-container">
        <div className="user-login-container-wrap">
          <div className="user-login-title">Wijzig wachtwoord</div>
          <div className="password-confirm-from">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Control
                className="user-login-input"
                type="password"
                name="password"
                placeholder="Je nieuwe wachtwoord"
                required
              />
              <Form.Control
                className="user-login-input"
                type="password"
                name="confirmpassword"
                placeholder="Bevestig nieuwe wachtwoord"
                required
              />

              <Button className="user-login-btn" type="submit">
                Bevestig nieuwe wachtwoord
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

const mapStateToProps = (state) => ({
  //Maps state to redux store as props
  auth_error: state.account.auth_error,
  isAuth_Error: state.account.isAuth_Error,
});

const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    resetPasswordConfirmEmail: (_data) =>
      resetPasswordConfirmEmail(_data, dispatch),
    resetAuthError: () => {
      dispatch(resetAuthError());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordResetConfirm);
