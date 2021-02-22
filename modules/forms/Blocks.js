import { useEffect, useCallback } from "react";
import { FieldWrap, ErrorWrap } from "@/components/styled/Forms";
import { useFormContext } from ".";
import get from "lodash/get";

function parseNativeEvent(ev) {
  if (!ev?.target) {
    return ev;
  }

  if (ev.target.type === "checkbox") {
    return ev.target.checked;
  }

  return ev.target.value;
}

export function Field({
  name,
  label,
  optional = false,
  showError = true,
  children,
  as = "input",
  ...rest
}) {
  const { state, actions } = useFormContext();
  const { errors, values } = state;
  const { validateField, onFieldChange } = actions;

  const error = get(errors, name);
  const value = get(values, name);

  const onChange = useCallback(
    (ev) => {
      const value = parseNativeEvent(ev);
      onFieldChange({ name, value });
    },
    [name, onFieldChange]
  );

  const onBlur = useCallback(
    (ev) => {
      validateField({ name });
    },
    [name, validateField]
  );

  const Component = as;

  return (
    <FieldWrap>
      {label ? (
        <label>
          {label}
          {optional ? "(Optional)" : ""}
        </label>
      ) : null}
      <Component
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        children={children}
        {...rest}
      />
      {error ? <ErrorWrap>{error}</ErrorWrap> : null}
    </FieldWrap>
  );
}

Field.FieldWrap = FieldWrap;

export function SyncFormValues({ onChange }) {
  const { state } = useFormContext();
  const values = state.values;
  useEffect(() => {
    onChange(values);
  }, [values, onChange]);

  return null;
}
