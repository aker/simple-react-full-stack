import React from "react";
import {Redirect} from "react-router-dom";

import {AuthConsumer} from "../authContext";

const Callback = props => (
  <AuthConsumer>
    {({handleAuthentication}) => {
      console.log(props);
      if (/access_token|id_token|error|/.test(props.location.hash)
            || /code/.test(props.location.search)) {
        handleAuthentication();
      }
      return <Redirect to="/"/>;
    }}
  </AuthConsumer>
);

export default Callback;
