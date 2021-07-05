import React, { useEffect, useState } from "react";
import Image from "next/image";
import DefaultLayout from "../components/layouts/Homepage";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { notification } from "antd";
import axios from "axios";
import { API_PATH } from "../constants";
import wave from "../public/images/login/wave.svg";
import drawing from "../public/images/login/drawing.svg";
import Link from "next/link";
import {
  FormTitle,
  FormText,
  FormBox,
  Label,
  TextInput,
  Button,
  LabelWrapper,
  MainWrapper,
  FormWrapper,
  RightSide,
  WaveWrapper,
  EyeWrapper,
  BottomTextATag,
  BottomText,
  Gradient,
  DrawingWrapper,
  ForgotPass,
  ButtonWrapper,
} from "../components/login/Login.style";
import Form from "@/modules/forms";
import { loginModule } from "../components/login/modules";
import { useWindowSize } from "@/utils/hooks/useWindowSize";
import { Field } from "@/modules/forms/Blocks";
import { useRouter } from "next/router";

const Login = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const size = useWindowSize();
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("auth-token") !== null) {
      const user = JSON.parse(localStorage.getItem("auth-user"));
      router.push(`/dashboard/${user.name.replaceAll(" ", "-")}`);
    }

    async function loadData() {
      await loginModule.actions.initialize();
    }
    loadData();
  }, []);

  const tokenConfig1 = (token) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (token) {
      config.headers["Authorization"] = `Token ${token}`;
    }
    return config;
  };

  async function sendLogin() {
    try {
      let res = await loginModule.actions.submit();
      let token = await res.key;
      axios
        .get(`${API_PATH.GETAUTHUSER}/`, tokenConfig1(token))
        .then((res) => {
          let obj = Object.assign({}, res.data);
          delete obj.is_super;
          localStorage.setItem("auth-user", JSON.stringify(obj));
          router.push(`/dashboard/${res.data.name.replaceAll(" ", "-")}`);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      const { errors } = loginModule.state;
      if (Object.keys(errors).length) {
        return;
      }
      if (error !== "oops") {
        notification.error({
          message: error.msg,
        });
      }
    }
  }

  return (
    <>
      <DefaultLayout showSignup={false}>
        <MainWrapper>
          <FormWrapper>
            {size.width < 1023 && (
              <WaveWrapper>
                <Image src={wave} layout="fill" objectFit="cover" />
                <DrawingWrapper>
                  <Image src={drawing} width={242} height={160} />
                </DrawingWrapper>
              </WaveWrapper>
            )}

            <FormTitle>Welcome Back!</FormTitle>
            <FormText>Login to your account</FormText>

            <FormBox>
              <Form
                module={loginModule}
                onSubmit={(ev) => {
                  ev.preventDefault();
                  sendLogin();
                }}
              >
                <LabelWrapper>
                  <Label>Email Address</Label>

                  <Field name="email" as={TextInput} />
                </LabelWrapper>
                <LabelWrapper>
                  <Label>Password</Label>

                  <Field
                    name="password"
                    as={TextInput}
                    type={passwordShown ? "text" : "password"}
                  />

                  <EyeWrapper>
                    <FontAwesomeIcon
                      icon={faEye}
                      onClick={togglePasswordVisiblity}
                      style={{ color: "lightgrey" }}
                    />
                  </EyeWrapper>
                </LabelWrapper>
                <ButtonWrapper>
                  <Button type="submit">Log in</Button>{" "}
                  <Link href="/reset-je-wachtwoord">
                    <ForgotPass>Forgot Password</ForgotPass>
                  </Link>
                </ButtonWrapper>
              </Form>
            </FormBox>
            <BottomText>
              Not a member?{" "}
              <Link href="/meld-je-aan-als-reparateur">
                <BottomTextATag>Sign Up Now</BottomTextATag>
              </Link>
            </BottomText>
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

export default Login;
