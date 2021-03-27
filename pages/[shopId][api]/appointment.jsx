import DefaultLayout from "@/components/layouts/Homepage";
import { MaxConstraints } from "@/components/styled/layout";
import {
  appointmentForm,
  brandFetcher,
  deviceFetcher,
  invalidTimeFetcher,
  modelFetcher,
  openTimeFetcher,
  serviceFetcher,
} from "@/components/appointment/modules";
import { getShopProfileByInformationServer } from "@/service/account/operations";
import React, { useEffect, useState } from "react";
import BookingInfo from "@/components/appointment/BookingInfo";
import styled, { css } from "styled-components";
import { SubTitle } from "@/components/styled/text";
import { Field } from "@/modules/forms/Blocks";
import LocationSelector from "@/components/appointment/LocationSelector";
import PaymentSelector from "@/components/appointment/PaymentSelector";
import Form from "@/modules/forms";
import DateAndTime from "@/components/appointment/DateAndTime";
import Steps from "@/components/appointment/Steps";
import Switch from "@/components/common/Switch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { TextButton } from "@/components/ui/Button";
import { FieldWrap } from "@/components/styled/Forms";

const MainWrap = styled.div`
  padding-top: 1px;

  > ${MaxConstraints} {
    display: flex;
    justify-content: space-between;
  }
`;

const FormWrap = styled.div`
  max-width: 690px;
  width: 100%;
`;

const LocationFieldWrap = styled.div`
  ${SubTitle} {
    margin: 52px 0 32px;
  }
`;

const DetailsForm = styled.div`
  padding: 0 41px 30px;
  background-color: #fff;
  border-radius: 10px;
  margin-top: 52px;
  width: 100%;
  border: 1px solid #ddd;

  header {
    height: 71px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ddd;
    margin: 0 -41px 30px;
    padding: 0 41px;
  }

  ${FieldWrap} {
    border: 2px solid #f0f0f0;
    padding: 5px 10px;
    border-radius: 5px;

    input {
      border: 0;
      border-bottom: 1px solid #ddd;
      border-radius: 2px;
      width: 100%;
    }
  }
`;

const InlineFields = styled.div`
  display: flex;
  justify-content: space-between;

  > div:nth-child(1) {
    flex-grow: 1;
  }

  > div + div {
    margin-left: 20px;
  }
`;

const AddressSection = styled.div`
  border-top: 3px solid #fafafa;
  margin-top: 23px;
  padding-top: 17px;
`;

export default function AppointmentPage({ shop }) {
  const [step, updateStep] = useState(0);

  useEffect(() => {
    async function loadData() {
      await appointmentForm.actions.initialize(shop);
      deviceFetcher.fetch();
      brandFetcher.fetch();
      modelFetcher.fetch();
      serviceFetcher.fetch();
      invalidTimeFetcher.fetch();
      openTimeFetcher.fetch();
    }

    loadData();
  }, []);

  function renderAddressFields() {
    if (appointmentForm.state?.values?.location === "in-store") {
      return null;
    }
    return (
      <AddressSection>
        <Field name="address" label="Street Address" autoComplete="street-address" />
        <InlineFields>
          <Field name="city" label="City" />
          <Field name="state" label="State" />
          <Field name="zip" label="Zip" autoComplete="postal-code"/>
        </InlineFields>
      </AddressSection>
    );
  }

  return (
    <DefaultLayout>
      <MainWrap>
        <MaxConstraints>
          <FormWrap>
            <Steps currentStep={step} updateStep={updateStep} />
            <Form module={appointmentForm}>
              <Switch value={step}>
                <Switch.Case value={0}>
                  <LocationFieldWrap>
                    <SubTitle>Repair location</SubTitle>
                    <Field name="location" as={LocationSelector} />
                  </LocationFieldWrap>
                  <DateAndTime />
                </Switch.Case>
                <Switch.Case value={1}>
                  <DetailsForm>
                    <header>
                      <SubTitle>Personal Details</SubTitle>
                    </header>
                    <Field name="name" label="Name" />
                    <InlineFields>
                      <Field name="email" label="E-mail Address" autoComplete="email" />
                      <Field name="tel" label="Contact Number" autoComplete="tel"/>
                    </InlineFields>
                    {renderAddressFields()}
                  </DetailsForm>
                </Switch.Case>
                <Switch.Case value={2}>
                  <Field name="paymentType" as={PaymentSelector} />
                </Switch.Case>
              </Switch>
            </Form>
            {step > 0 ? (
              <TextButton onClick={() => updateStep((state) => state - 1)}>
                <FontAwesomeIcon icon={faArrowLeft} /> Back to previous step
              </TextButton>
            ) : null}
          </FormWrap>
          <BookingInfo
            shop={shop}
            nextStep={() => {
              if (step === 2) {
                return;
              }
              updateStep((state) => state + 1);
            }}
          />
        </MaxConstraints>
      </MainWrap>
    </DefaultLayout>
  );
}

export async function getServerSideProps(ctx) {
  const shopId = ctx.query["shopId][api"];
  const shopProfileServerInfo = await getShopProfileByInformationServer(shopId);
  return {
    props: {
      shop:
        shopProfileServerInfo && shopProfileServerInfo[0]
          ? shopProfileServerInfo[0]
          : shopProfileServerInfo,
    },
  };
}
