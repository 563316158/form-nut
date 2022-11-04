import React from "react";
import FormContext from "./FormContext";
import useForm from "./useForm";

export default function Form(
  { children, form, onFinish, onFinishFailed },
  ref
) {
  const [formInstance] = useForm(form);

  React.useImperativeHandle(ref, () => formInstance);

  console.log("ref:", ref);

  formInstance.setCallbacks({
    onFinish,
    onFinishFailed,
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        formInstance.submit();
      }}
    >
      <FormContext.Provider value={formInstance}>
        {children}
      </FormContext.Provider>
    </form>
  );
}
