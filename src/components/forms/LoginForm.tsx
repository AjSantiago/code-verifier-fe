import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { login } from '../../services/authService';
import { AxiosResponse } from 'axios';

//* Define Schema of validation with Yup
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

//* Login Component
const LoginForm = () => {
  const initialCredentials = {
    email: '',
    password: '',
  };

  let navigate = useNavigate();

  return (
    <div>
      <h4>Login Form</h4>
      {/* Formik to encapsulate a Form */}
      <Formik
        initialValues={initialCredentials}
        validationSchema={loginSchema}
        onSubmit={async (values) => {
          login(values.email, values.password)
            .then(async (response: AxiosResponse) => {
              if (response.status === 200) {
                if (response.data.token) {
                  await sessionStorage.setItem(
                    'sessionJWTToken',
                    response.data.token
                  );
                  navigate('/');
                } else {
                  throw new Error('Error generating Login Token');
                }
              } else {
                throw new Error('Invalid credentials');
              }
            })
            .catch((error) =>
              console.error(`[Login Error]: Something went wrong ${error}`)
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

            {/* Submit Form */}
            <button type='submit'>Login</button>

            {/* Message if the form is submitting */}
            {isSubmitting ? <p>Checking credentials...</p> : null}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
