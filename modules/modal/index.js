import { Drawer as AntDrawer } from "antd";
import Dialog from "rc-dialog";
import { connect } from "react-redux";
import { v4 as uuid } from "uuid";

import { store } from "@/configureStore";
export function createModalModule() {
  const guid = uuid();

  function getModuleState(state) {
    return state.modal?.[guid];
  }

  return {
    guid,
    actions: {
      resolve() {},
      open(payload) {
        store.ref.dispatch({ type: "OPEN_MODAL", guid, payload });

        return {
          then: (resolve, reject) => {
            this.resolve = async (...args) => {
              try {
                await resolve(...args);
              } catch (err) {
                return;
              }
              this.close();
            };
            this.reject = (...args) => {
              reject?.(...args);
              this.close();
            };
          },
        };
      },
      close() {
        store.ref.dispatch({ type: "CLOSE_MODAL", guid });
      },
    },
    selectors: {
      get data() {
        return getModuleState(store.ref.getState())?.payload;
      },
      get isVisible() {
        return !!getModuleState(store.ref.getState());
      },
    },
  };
}

function DEFAULT_BUTTONS({ module }) {
  return [
    <button onClick={() => module.actions.close()}>Cancel</button>,
    <button onClick={() => module.actions.resolve?.()}>Submit</button>,
  ];
}

const Modal = connect((state, ownProps) => ({
  visible: ownProps.module.selectors.isVisible,
  onClose: ownProps.module.actions.close,
}))(function ({ module, footer = DEFAULT_BUTTONS, ...rest }) {
  return (
    <Dialog className="custom-modal" {...rest} footer={footer?.({ module })} />
  );
});

export const Drawer = connect((state, ownProps) => ({
  visible: ownProps.module.selectors.isVisible,
  onClose: ownProps.module.actions.close,
}))(function ({ module, ...rest }) {
  return <AntDrawer className="custom-drawer" {...rest} />;
});

export default Modal;
