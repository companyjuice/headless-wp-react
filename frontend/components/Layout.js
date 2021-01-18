import { React, useState } from 'react';
import Header from './Header';
//import Menu from './Menu';
import Footer from './Footer';

import { GoogleReCaptchaProvider, GoogleReCaptcha } from 'react-google-recaptcha-v3'
// IMPORTANT NOTES: The `GoogleReCaptcha` component is a wrapper around `useGoogleRecaptcha` hook and use `useEffect` to run the verification.
// It's important that you understand how React hooks work to use it properly.
// Avoid using inline function for the `onVerify` props as it can possibly cause the verify function to run continously.
// To avoid that problem, you can use a memoized function provided by `React.useCallback` or a class method
// The code below is an example that inline function can result in an infinite loop and the verify function runs continously:

const MyComponent = () => {
  const [token, setToken] = useState()

  return (
    <div>
      <GoogleReCaptcha
        onVerify={recaptcha_token => {
          setToken(recaptcha_token)
        }}
      />
    </div>
  )
}


const Layout = props => {
  const { children } = props;
  /** reCAPTCHA */
  const handleVerify = e => {
    console.log(e)
    // e.persist()
    // this.setState({
    //   [e.target.id]: e.target.value
    // })
    // this.setState({
    //   status_submitted: false,
    //   status_submitting: false,
    //   status_info_error: false, 
    //   status_info_msg: null,
    // })
    // this.setState({
    //   recaptcha_token: e,
    // })
  }
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey="6LeleS0aAAAAAPY9sbnaVxLOrhn4sH-7cxZXnJLW" // "[Your recaptcha key]"
      // language="[optional_language]"
      // useRecaptchaNet="[optional_boolean_value]"
      // scriptProps={{
      //   async: false, // optional, default to false
      //   defer: false, // optional, default to false
      //   appendTo: "head", // optional, default to "head", can be "head" or "body"
      //   nonce: undefined, // optional, default undefined
      // }}
    >
      <div>
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </div>
      <GoogleReCaptcha onVerify={handleVerify} />
      {/*<MyComponent />*/}
    </GoogleReCaptchaProvider>
  );
};

export default Layout;
