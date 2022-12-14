import React from 'react';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { register } from '../../services/authService';
import { AxiosResponse } from 'axios';

//* Define Schema of validation with Yup
const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(5, 'Username must have 5 letters minimum')
    .max(12, 'Username must have maximum 12 letters')
    .required('Email is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password too short')
    .required('Password is required'),
  confirm: Yup.string()
    .when('password', {
      is: (value: string) => (value && value.length > 0 ? true : false),
      then: Yup.string().oneOf([Yup.ref('password')], 'Password must match'),
    })
    .required('You must confirm your password'),
  age: Yup.number()
    .min(10, 'You must be over 10 years old')
    .required('Age is required'),
});

const RegisterForm = () => {
  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    age: 18,
  };

  return (
    <div>
      <h4>Login Form</h4>
      {/* Formik wrapper */}
      <Formik
        initialValues={initialValues}
        validationSchema={registerSchema}
        onSubmit={async (values) => {
          register(values.name, values.email, values.password, values.age)
            .then((response: AxiosResponse) => {
              if (response.status === 200) {
                console.log('user registered correctly');
                console.log(response.data);
              } else {
                throw new Error('Error in registry');
              }
            })
            .catch((error) =>
              console.error(`[Register Error]: Something went wrong ${error}`)
            );
        }}
      >
        {({
          values,
          touched,
          errors,
          handleBlur,
          handleChange,
          isSubmitting,
        }) => (
          <Form>
            {/* Name Field */}
            <label htmlFor='name'>Name</label>
            <Field id='name' type='text' name='name' placeholder='Your name' />

            {/* Name Errors */}
            {errors.name && touched.name && (
              <ErrorMessage name='name' component='div'></ErrorMessage>
            )}

            {/* Email Field */}
            <label htmlFor='email'>Email</label>
            <Field
              id='email'
              type='email'
              name='email'
              placeholder='example@email.com'
            />

            {/* Email Errors */}
            {errors.email && touched.email && (
              <ErrorMessage name='email' component='div'></ErrorMessage>
            )}

            {/* Password Field */}
            <label htmlFor='password'>Password</label>
            <Field
              id='password'
              type='password'
              name='password'
              placeholder='Password'
            />

            {/* Password Errors */}
            {errors.password && touched.password && (
              <ErrorMessage name='password' component='div'></ErrorMessage>
            )}

            {/* Confirm Password Field */}
            <label htmlFor='confirm'>Confirm Password</label>
            <Field
              id='confirm'
              type='password'
              name='confirm'
              placeholder='Confirm your password'
            />

            {/* Confirm Password Errors */}
            {errors.confirm && touched.confirm && (
              <ErrorMessage name='confirm' component='div'></ErrorMessage>
            )}

            {/* Age Field */}
            <label htmlFor='age'>Age</label>
            <Field id='age' type='number' name='age' />

            {/* Age Errors */}
            {errors.age && touched.age && (
              <ErrorMessage name='age' component='div'></ErrorMessage>
            )}

            {/* Submit Form */}
            <button type='submit'>Register</button>

            {/* Message if the form is submitting */}
            {isSubmitting ? <p>Sending data to registry...</p> : null}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
