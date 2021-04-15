import React, { useEffect } from "react";
import logo from "@/assets/images/logo.png";
import Image from "next/image";
import Form from "@/modules/forms";
import { agrementModal, registerFormModule } from "./modules";
import router from "next/router";
import { notification, Checkbox } from "antd";
import {
  RegisterFormArea,
  AccountTitle,
  AccountSubTitle,
  FormWrap,
  ChamberInputWrap,
  InputWrap,
  CheckboxWrap,
} from "./RegisterForm.style";
import "./RegisterForm.style.less";
import { Field, parseNativeEvent } from "@/modules/forms/Blocks";
import Button from "@/components/ui/Button";
import Modal from "@/modules/modal";
import { AGREEMENT_TEXT } from "@/constants";
import { SubTitle } from "@/components/styled/text";

const ChamberInput = ({ value, onChange }) => {
  return (
    <ChamberInputWrap>
      <div>KVK -</div>
      <input
        onChange={(value) => {
          const ev = parseNativeEvent(value);
          onChange(ev);
        }}
        value={value}
      />
    </ChamberInputWrap>
  );
};

const TermCheckbox = ({ value, onChange }) => {
  return (
    <div className="agree-button-group">
      <CheckboxWrap>
        <Checkbox
          onChange={(value) => {
            const ev = parseNativeEvent(value);
            onChange(ev);
          }}
          checked={value}
        />
      </CheckboxWrap>
      <div>
        Door een account aan te maken ga ik akkoord met{" "}
        <a
          onClick={() => {
            agrementModal.actions.open();
          }}
          className="agree-description"
        >
          De voorwaarden
        </a>
      </div>
    </div>
  );
};

async function registerUser() {
  try {
    await registerFormModule.actions.submit();

    notification.success({
      description:
        "Bedankt voor je aanmelding bij MrAgain. We voeren nu enkele checks uit waarna je een email van ons ontvangt om je account te activeren. Let op: deze email kan in je spam terecht komen!",
      duration: 2.5,
    });

    setTimeout(() => {
      router.router.push("/");
    }, 3000);
  } catch (error) {
    const { errors } = registerFormModule.state;
    if (Object.keys(errors).length) {
      return;
    }
    if (error !== "") {
      notification.error({
        message: error.error,
      });
    }
  }
}

const RegisterForm = () => {
  useEffect(() => {
    async function loadData() {
      await registerFormModule.actions.initialize();
    }

    loadData();
  }, []);

  return (
    <RegisterFormArea>
      <div className="row account-image">
        <Image
          quality={50}
          loading={"eager"}
          priority={true}
          width={80}
          height={30}
          src={logo}
          alt="Logo Mr Again"
          style={{
            display: "table-cell",
            verticalAlign: "middle",
          }}
        />
      </div>
      <AccountTitle className="row">Laten we beginnen!</AccountTitle>
      <AccountSubTitle className="row">
        Registreer nu je gratis account
      </AccountSubTitle>
      <div className="row">
        <div className="account-create-container2">
          <div className="account-create-container2-wrap">
            <FormWrap>
              <Form
                module={registerFormModule}
                onSubmit={(ev) => {
                  ev.preventDefault();
                  registerUser();
                }}
              >
                <InputWrap>
                  <Field
                    className="inputForm"
                    name="companyName"
                    label="Bedrijfsnaam"
                  />
                </InputWrap>
                <InputWrap>
                  <Field
                    className="inputForm"
                    name="chamber"
                    label="kvk nummer"
                    as={ChamberInput}
                  />
                </InputWrap>
                <InputWrap>
                  <Field
                    className="inputForm"
                    name="email"
                    label="Emailadres"
                    autoComplete="email"
                  />
                </InputWrap>
                <InputWrap>
                  <Field
                    className="inputForm"
                    name="password"
                    label="Wachtwoord"
                    type="password"
                  />
                </InputWrap>
                <InputWrap>
                  <Field
                    className="inputForm"
                    name="confirmPassword"
                    label="Bevestig je wachtwoord"
                    type="password"
                  />
                </InputWrap>
                <Field name="terms" as={TermCheckbox} />
                <div className="account-button-container">
                  <Button className="account-create-btn2" type="submit">
                    Registreer
                  </Button>
                </div>
              </Form>
            </FormWrap>
          </div>
        </div>
      </div>
      <Modal
        title={<SubTitle>Agreement</SubTitle>}
        footer={null}
        module={agrementModal}
      >
        <div dangerouslySetInnerHTML={{ __html: AGREEMENT_TEXT }} />
      </Modal>
    </RegisterFormArea>
  );
};


export default RegisterForm;
