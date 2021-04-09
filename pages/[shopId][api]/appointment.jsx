import DefaultLayout from "@/components/layouts/Homepage";
import { MaxConstraints } from "@/components/styled/layout";
import {
  appointmentConfirmation,
  appointmentForm,
  appointmentReview,
  brandFetcher,
  deviceFetcher,
  invalidTimeFetcher,
  modelFetcher,
  openTimeFetcher,
  serviceFetcher,
} from "@/components/appointment/modules";
import { getShopProfileByInformationServer } from "@/service/account/operations";
import React, { useCallback, useEffect, useState } from "react";
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
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { TextButton } from "@/components/ui/Button";
import { FieldWrap } from "@/components/styled/Forms";
import ConfirmationModal from "@/components/common/ConfirmationModal";
import media, { OnMobile } from "@/utils/media";
import BookingInfoMobile from "@/components/appointment/BookingInfoMobile";
import Button from "@/components/ui/Button";
import router from "next/router";
import { useFetcher } from "@/modules/dataFetcher";
import { store } from "@/configureStore";

const MainWrap = styled.div`
  padding-top: 1px;
  margin-bottom: -87px;

  ${media.tablet`
    > ${MaxConstraints} {
      display: flex;
      justify-content: space-between;
    }
  `}
`;

const FormWrap = styled.div`
  max-width: 690px;
  width: 100%;

  form.fullwidth {
    margin: 0 -20px;
  }
`;

const LocationFieldWrap = styled.div`
  ${SubTitle} {
    display: none;
    margin: 52px 0 32px;
  }

  ${media.tablet`
    ${SubTitle} {
      display: block;
    }
  `}
`;

const CTAButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 0;
  > button {
    font-size: 10px;
    text-transform: none;
  }
`;

const DetailsForm = styled.div`
  background-color: #fff;
  width: calc(100% + 40px);
  margin: 11px -20px 0;
  padding: 0 20px 30px;

  header {
    height: 71px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ddd;
    margin: 0 -20px 30px;
    padding: 0 20px;
  }
  h4 {
    margin-bottom: 0;
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

  ${media.tablet`
    padding: 0 41px 30px;
    border-radius: 10px;
    border: 1px solid #ddd;
    margin: 52px 0 0 0;
    width: 100%;


    header {
      margin: 0 -41px 30px;
      padding: 0 41px;
    }
  `}
`;

const InlineFields = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  ${media.tablet`
    flex-direction: row;
    > div:nth-child(1) {
      flex-grow: 1;
    }

    > div + div {
      margin-left: 20px;
    }
  `}
`;

const MobileToolbar = styled.div`
  position: fixed;
  display: flex;
  bottom: 0;
  background-color: #fff;
  height: 60px;
  padding: 0 20px;
  box-shadow: 0 0 27px rgba(0, 0, 0, 0.3);
  width: 100%;
  z-index: 110;
  left: 0;
  justify-content: flex-end;
  align-items: center;

  ${CTAButtons} {
    width: 100%;
    align-items: center;
  }

  ${Button}:not(${TextButton}) {
    padding: 7px 22px;
    height: 37px;
    line-height: 23px;
    box-shadow: 0 0 8px #06c987;

    &[disabled] {
      box-shadow: 0 0 8px #a0a0a0;
    }
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

  const onNext = useCallback(async () => {
    if (step === 0) {
      await appointmentForm.actions.validateField({ name: "time" });
      const { errors } = appointmentForm.state;
      if (Object.keys(errors).length) {
        appointmentConfirmation.actions.open({
          type: "warning",
          message:
            "Je lijkt niet alle informatie te hebben ingevuld, even checken? ",
          description:
            "We hebben al je informatie nodig om een afspraak te maken",
          buttonLabel: "Probeer het nog een keer",
        });
        return;
      }
    }
    if (step === 1) {
      const reviewData = {
        form: appointmentForm.state.values,
        shop,
        service: serviceFetcher.selector(store.ref.getState()).result,
        brand: brandFetcher.selector(store.ref.getState()).result,
        device: deviceFetcher.selector(store.ref.getState()).result,
        model: modelFetcher.selector(store.ref.getState()).result,
      };

      try {
        await appointmentForm.actions.submit();
        appointmentConfirmation.actions
          .open({
            type: "success",
            message: "Afspraak succesvol gemaakt! ",
            description:
              "We hebben een bevestiging email naar je verzonden (kan in je spam zitten!)",
            buttonLabel: "Bekijk afspraak gegevens",
          })
          .then(() => {
            appointmentReview.actions.open(reviewData);
            router.router.push("/");
          });
      } catch (err) {
        if (err.validationErrors) {
          appointmentConfirmation.actions.open({
            type: "warning",
            message:
              "Je lijkt niet alle informatie te hebben ingevuld, even checken? ",
            description:
              "We hebben al je informatie nodig om een afspraak te maken",
            buttonLabel: "Probeer het nog een keer",
          });
          return;
        }
        appointmentConfirmation.actions.open({
          type: "error",
          message: "Oops!",
          description: "Er is iets fout gegaan",
          buttonLabel: "Probeer het nog eens",
        });
      }
      return;
    }
    updateStep((state) => state + 1);
  });

  function renderAddressFields() {
    if (appointmentForm.state?.values?.location === "in-store") {
      return null;
    }
    return (
      <AddressSection>
        <Field
          name="address"
          label="Street Address"
          autoComplete="street-address"
        />
        <InlineFields>
          <Field name="city" label="City" />
          <Field name="state" label="State" />
          <Field name="zip" label="Zip" autoComplete="postal-code" />
        </InlineFields>
      </AddressSection>
    );
  }

  const ctaButtons = (
    <CTAButtons>
      {step > 0 ? (
        <TextButton aria-label="Terug naar vorige stap" onClick={() => updateStep((state) => state - 1)}>
          <FontAwesomeIcon icon={faArrowLeft} /> Terug naar vorige stap
        </TextButton>
      ) : (
        <span />
      )}
      <OnMobile only>
        <Button onClick={onNext} aria-label="Volgende">
          Volgende <FontAwesomeIcon icon={faArrowRight} />
        </Button>
      </OnMobile>
    </CTAButtons>
  );

  return (
    <DefaultLayout>
      <MainWrap>
        <MaxConstraints>
          <OnMobile only>
            <BookingInfoMobile shop={shop} />
          </OnMobile>
          <FormWrap>
            <Steps currentStep={step} updateStep={updateStep} />
            <Form module={appointmentForm}>
              <Switch value={step}>
                <Switch.Case value={0}>
                  <LocationFieldWrap>
                    <SubTitle>Maak je keuze</SubTitle>
                    <Field name="location" as={LocationSelector} />
                  </LocationFieldWrap>
                  <DateAndTime />
                </Switch.Case>
                <Switch.Case value={1}>
                  <DetailsForm>
                    <header>
                      <SubTitle>Jouw gegevens</SubTitle>
                    </header>
                    <Field name="name" label="Naam" />
                    <InlineFields>
                      <Field
                        name="email"
                        label="E-mail adres"
                        autoComplete="email"
                      />
                      <Field
                        name="tel"
                        label="Telefoon nummer"
                        autoComplete="tel"
                      />
                    </InlineFields>
                    {renderAddressFields()}
                  </DetailsForm>
                </Switch.Case>
                <Switch.Case value={2}>
                  <Field name="paymentType" as={PaymentSelector} />
                </Switch.Case>
              </Switch>
            </Form>
            <OnMobile show={false}>{ctaButtons}</OnMobile>
            <OnMobile only>
              <MobileToolbar>{ctaButtons}</MobileToolbar>
            </OnMobile>
          </FormWrap>
          <OnMobile show={false}>
            <BookingInfo shop={shop} nextStep={onNext} />
          </OnMobile>
          <ConfirmationModal module={appointmentConfirmation} />
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
