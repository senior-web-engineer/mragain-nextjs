import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { notification } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import Form from "@/modules/forms";
import { Field } from "@/modules/forms/Blocks";
import { useScreenSize } from "@/utils/media";

import DefaultLayout from "../../../../components/layouts/Homepage";
import { resetPasswordModule } from "../../../../components/resetPassword/restpassword";
import drawing from "../../../../public/images/login/drawing.svg";
import wave from "../../../../public/images/login/wave.svg";
import {
  Button,
  DrawingWrapper,
  EyeWrapper,
  FormBox,
  FormTitle,
  FormWrapper,
  Label,
  LabelWrapper,
  MainWrapper,
  TextInput,
  WaveWrapper,
  Gradient,
  RightSide
} from "../../../../styled-components/Login.style";

const PasswordResetConfirm = (routerProps) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };
  const smallScreenSizes = ["tablet", "desktop", "mobile"];
  const { size } = useScreenSize();
  const [isload, setLoad] = React.useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isload === false) {
      let query = router.query;
      resetPasswordModule.actions.initialize({ uid: query.id_1, token: query.id_2 });
      setLoad(true);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    let res = await resetPasswordModule.actions.submit();
    if (res.error != null) {
      for (const [key, value] of Object.entries(res.error)) 
        notification.success({ message: `${key} ${value[0]}` })
    } else {
      notification.success({ message:"Je wachtwoord is succesvol gewijzigd"});
        setTimeout(() => {
          router.push("/login");
        }, 2000);
    }
  };
  return (
    <>
      <DefaultLayout showSignup={false}>
        <MainWrapper>
          <FormWrapper>
            {smallScreenSizes.includes(size) && (
              <WaveWrapper>
                <Image src={wave} layout="fill" objectFit="cover" />
                <DrawingWrapper>
                  <Image src={drawing} width={242} height={160} />
                </DrawingWrapper>
              </WaveWrapper>
            )}
            <FormTitle>Wijzig wachtwoord</FormTitle>
            <FormBox>
              <Form
                module={resetPasswordModule}
                onSubmit={handleSubmit}
              >
                <LabelWrapper>
                  <Label>Je nieuwe wachtwoord</Label>
                  <Field
                    name="password"
                    as={TextInput}
                    type={passwordShown ? "text" : "password"}
                    placeholder="Je nieuwe wachtwoord"
                  />
                  <EyeWrapper>
                    <FontAwesomeIcon
                      icon={faEye}
                      onClick={togglePasswordVisiblity}
                      style={{ color: "lightgrey" }}
                    />
                  </EyeWrapper>
                </LabelWrapper>
                <LabelWrapper>
                  <Label>Bevestig nieuwe wachtwoord</Label>

                  <Field
                    name="confirmpassword"
                    as={TextInput}
                    type={passwordShown ? "text" : "password"}
                    placeholder="Bevestig nieuwe wachtwoord"
                  />

                  <EyeWrapper>
                    <FontAwesomeIcon
                      icon={faEye}
                      onClick={togglePasswordVisiblity}
                      style={{ color: "lightgrey" }}
                    />
                  </EyeWrapper>
                </LabelWrapper>
                <Button type="submit">Wijzig wachtwoord</Button>
              </Form>
            </FormBox>
          </FormWrapper>

          <div
            style={{ display: "flex", flexDirection: "column", flex: "2.5" }}
          >
            <Gradient />
            <RightSide />
          </div>
        </MainWrapper>
      </DefaultLayout>
    </>
  );
};

export default PasswordResetConfirm