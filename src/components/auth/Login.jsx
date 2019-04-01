import React from "react";
import { connect } from "react-redux";
import { userLogin } from "../../actions";
import LoginForm from "./LoginForm";
const Login = ({ userLogin }) => {
  const onSubmit = values => {
    userLogin(values);
  };
  return (
    <div className="login-page">
      <div className="header">果丽团购控制台</div>
      <div className="body">
        <LoginForm onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default connect(
  null,
  { userLogin }
)(Login);
