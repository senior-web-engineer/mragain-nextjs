import { connect } from "react-redux";
import { v4 as uuid } from "uuid";
import Loader from "@/components/common/Loader";
import { useRef, useEffect, createContext, useContext } from "react";
import "./rules";
import FormActions from "./actions";
import { store } from "@/configureStore";


export function createFormModule({ init, submit, validator, guid = uuid() } = {}) {
  return {
    validator,
    guid,
    actions: new FormActions({init, submit, validator, guid}),
    get state() {
      return store.ref.getState().forms?.[guid]
    }
  };
}

const FormContext = createContext();

export function useFormContext() {
  return useContext(FormContext);
}

const Form = connect((state, ownProps) => ({
  moduleState: state.forms?.[ownProps.module.guid],
}))(function ({ moduleState, module, children }) {
  useEffect(() => {
    if (!moduleState || !module) {
      return;
    }

    if (moduleState.isLoading) {
      return;
    }

  }, [moduleState, module]);

  if (!moduleState || !module) {
    return null;
  }

  if (moduleState.isLoading) {
    return <Loader />;
  }

  return (
    <FormContext.Provider
      value={{ state: moduleState, actions: module.actions }}
    >
      <form
        action="#"
        onSubmit={(ev) => {
          ev.preventDefault();
          module.actions.submit();
        }}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
});

export default Form;
