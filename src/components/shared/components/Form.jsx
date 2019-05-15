import React, { useState } from "react";
import { uniqueId } from "lodash";

const Form = ({ labels, handleOnSubmit, formInputs, validate }) => {
  const initFormValues = formInputs.reduce(
    (init, formInput) => ({ ...init, [formInput.name]: "" }),
    {}
  );

  const [formValues, setFormValues] = useState(initFormValues);

  const initErrorMessage = formInputs.reduce(
    (init, formInput) => ({ ...init, [formInput.name]: [] }),
    {}
  );

  const [errorMessages, setErrorMessages] = useState(initErrorMessage);

  const onSubmit = e => {
    e.preventDefault();
    let isValideToSubmit = true;
    for (const key in errorMessages) {
      if (errorMessages[key] && errorMessages[key].length !== 0) {
        isValideToSubmit = false;
      }
    }
    if (
      isValideToSubmit &&
      formValues["password"] === formValues["repeat_password"]
    ) {
      handleOnSubmit(formValues);
    }
  };

  const handleInputChange = async e => {
    const name = e.target.name;

    setFormValues({ ...formValues, [name]: e.target.value });

    setErrorMessages({
      ...errorMessages,
      [name]: validate(e.target.value, name)
    });
  };

  const renderInput = ({ name, type, placeholder, iconName }) => {
    return (
      <label
        className={`component-form__form-field  ${
          errorMessages[name].length === 0 ? "" : "error"
        }`}
      >
        <i className="material-icons">{iconName}</i>

        <input
          name={name}
          type={type}
          value={formValues[name]}
          className="component-form__input"
          onChange={handleInputChange}
        />
        <label
          htmlFor={name}
          className={`placeholder-label ${
            formValues[name] !== "" ? "input-not-empty" : ""
          } ${errorMessages[name].length === 0 ? "" : "error"}`}
        >
          {errorMessages[name].length === 0
            ? placeholder
            : errorMessages[name][0]}
        </label>
      </label>
    );
  };

  return (
    <div className="component-form">
      <form onSubmit={onSubmit}>
        {formInputs.map(formInput => {
          return (
            <div
              key={formInput.name}
              className="component-form__input-container"
            >
              {renderInput(formInput)}
            </div>
          );
        })}

        <button className="component-form__submit-button">
          {labels.login_form_submit_button}
        </button>
      </form>
    </div>
  );
};

export default Form;
