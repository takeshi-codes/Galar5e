import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'typeface-roboto';
import Amplify from 'aws-amplify';
import config from './config';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  },
  API: {
    endpoints: [
      {
        name: "api-galar5e",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      },
      {
        name:"prod-monstermanual",
        endpoint: config.monsterManual.URL,
        region: config.monsterManual.REGION
      },
    ]
  }
});


const app = (
  <BrowserRouter forceRefresh={ true }>
      <App />
  </BrowserRouter>
);

ReactDOM.render( app, document.getElementById( 'root' ) );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
