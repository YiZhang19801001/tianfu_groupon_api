import React, { useState } from "react";

const LoginForm = ({ onSubmit }) => {
  const [formValues, setFormValues] = useState({ phone: "", password: "" });

  const formFields = [
    {
      name: "phone",
      type: "text",

      label: `电话号码`,
      placeholder: `请输入电话号码或邮箱地址`
    },
    {
      name: "password",
      type: "password",
      label: `密码`,
      placeholder: `请输入密码`
    }
  ];

  const renderInput = ({ name, label, placeholder, type }) => {
    return (
      <div className="form-field" key={`loginFormFiled${name}`}>
        <label>
          <span>{label}</span>
          <input
            type={type}
            placeholder={placeholder}
            value={formValues[name]}
            onChange={e => {
              setFormValues({ ...formValues, [name]: e.target.value });
            }}
          />
        </label>
      </div>
    );
  };
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit(formValues);
      }}
    >
      {formFields.map(formField => {
        return renderInput(formField);
      })}
      <button>登录</button>
    </form>
  );
};

export default LoginForm;
