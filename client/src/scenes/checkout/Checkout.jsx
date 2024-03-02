import { Box, Button, Stepper, Step, StepLabel } from "@mui/material";
import React from "react";
import { UseSelector, useSelector } from "react-redux";
// import { Formik } from "formik";
import { Formik } from "formik";

import { useState } from "react";
import * as yup from "yup";
import { shades } from "../../theme";
import Shipping from "./Shipping";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";

const stripepromise = loadStripe(
  "pk_test_51OppufSCTYfNrNc7xb9DBjv0n0dWgjPVUyrdf2mziLMIGbMoTeOf0mxJCI2Ho9N8oAvp3IjxKP2cTnR20Wd13H9c00dv6ZTgJV"
);

const initialValues = {
  billingAddress: {
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  shippingAddress: {
    isSameAddress: true,
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  email: "",
  phoneNumber: "",
};

// const checkoutSchema = [
//   yup.object().shape({
//     billingAddress: yup.object().shape({
//       firstName: yup.string().required("required"),
//       lastName: yup.string().required("required"),
//       country: yup.string().required("required"),
//       street1: yup.string().required("required"),
//       street2: yup.string(),
//       city: yup.string().required("required"),
//       state: yup.string().required("required"),
//       zipCode: yup.string().required("required"),
//     }),
//     shippingAddress: yup.object().shape({
//       isSameAddress: yup.boolean(),
//       firstName: yup.string().when("isSameAddress", {
//         is: false,
//         then: yup.string().required("required"),
//       }),
//       lastName: yup.string().when("isSameAddress", {
//         is: false,
//         then: yup.string().required("required"),
//       }),
//       country: yup.string().when("isSameAddress", {
//         is: false,
//         then: yup.string().required("required"),
//       }),
//       street1: yup.string().when("isSameAddress", {
//         is: false,
//         then: yup.string().required("required"),
//       }),
//       street2: yup.string(),
//       city: yup.string().when("isSameAddress", {
//         is: false,
//         then: yup.string().required("required"),
//       }),
//       state: yup.string().when("isSameAddress", {
//         is: false,
//         then: yup.string().required("required"),
//       }),
//       zipCode: yup.string().when("isSameAddress", {
//         is: false,
//         then: yup.string().required("required"),
//       }),
//     }),
//   }),
//   yup.object().shape({
//     email: yup.string().required("required"),
//     phoneNumber: yup.string().required("required"),
//   }),
// ];

const checkoutSchema = yup.object().shape({
  billingAddress: yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    country: yup.string().required("Country is required"),
    street1: yup.string().required("Street Address is required"),
    street2: yup.string(),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    zipCode: yup.string().required("Zip Code is required"),
  }),
  shippingAddress: yup.object().when("billingAddress.isSameAddress", {
    is: false,
    then: yup.object().shape({
      firstName: yup.string().required("First Name is required"),
      lastName: yup.string().required("Last Name is required"),
      country: yup.string().required("Country is required"),
      street1: yup.string().required("Street Address is required"),
      street2: yup.string(),
      city: yup.string().required("City is required"),
      state: yup.string().required("State is required"),
      zipCode: yup.string().required("Zip Code is required"),
    }),
    otherwise: yup.object().shape({
      isSameAddress: yup.boolean().required(),
    }),
  }),
  email: yup.string().required("Email is required").email("Invalid Email"),
  phoneNumber: yup.string().required("Phone Number is required"),
});

const Checkout = () => {
  const [activestep, setActivestep] = useState(0);
  const cart = useSelector((state) => state.cart.cart);
  const isFirstStep = activestep === 0;
  const isSecondStep = activestep === 1;

  const handleSubmit = async (values, actions) => {
    setActivestep(activestep + 1);
    // copying billing and shipping address
    if (isFirstStep && values.shippingAddress.isSameAddress) {
      actions.setFieldValue("shippingAddress", {
        ...values.billingAddress,
        isSameAddress: true,
      });
    }
    if (isSecondStep) {
      makePayment(values);
    }

    actions.setTouched({});
  };

  async function makePayment(values) {
    const stripe = await stripepromise;
    const requestBody = {
      userName: [values.firstName, values.lastName].join(""),
      email: values.email,
      products: cart.map(({ id, count }) => ({
        id,
        count,
      })),
    };
    const response = await fetch("http://localhost:1337/api/orders", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });
    const session = await response.json();
    await stripe.redirectToCheckout({
      sessionId: session.id,
    });
  }

  return (
    <Box width={"80%"} margin={"100px auto"}>
      <Stepper activestep={activestep} sx={{ m: "20px 0" }}>
        <Step>
          <StepLabel>Billing</StepLabel>
        </Step>
        <Step>
          <StepLabel>Payment</StepLabel>
        </Step>
      </Stepper>

      <Box>
        <Formik
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema[activestep]}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleSubmit,
            handleChange,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              {isFirstStep && (
                <Shipping
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  setFieldValue={setFieldValue}
                />
              )}
              {isSecondStep && (
                <Payment
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  setFieldValue={setFieldValue}
                />
              )}

              <Box
                display={"flex"}
                justifyContent={"space-between"}
                gap={"50px"}
              >
                {isSecondStep && (
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    sx={{
                      backgroundColor: shades.primary[200],
                      boxShadow: "none",
                      borderRadius: "none",
                      padding: "15px 40px",
                    }}
                    // onClick={() => setActivestep(activestep - 1)}
                  >
                    Back
                  </Button>
                )}

                <Button
                  fullWidth
                  type="submit"
                  color="primary"
                  variant="contained"
                  sx={{
                    backgroundColor: shades.primary[400],
                    boxShadow: "none",
                    borderRadius: "none",
                    padding: "15px 40px",
                  }}
                  onClick={() => setActivestep(activestep - 1)}
                >
                  {isFirstStep ? "Next" : "Place Order"}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default Checkout;
