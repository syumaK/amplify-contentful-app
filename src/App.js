import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

/*
import contentful modules
*/

import * as contentful from 'contentful'


/*
import amplify modules
*/
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
import Amplify from 'aws-amplify';
import config from './aws-exports';

/*
set contentful client
*/
export const client = contentful.createClient({
  space: 'TODO_JUST_CREATED',
  accessToken: 'TODO_JUST_CREATED'
});

Amplify.configure(config);

function App() {

  const [title, setTitle] = useState(null);

  useEffect((() => {
    client.getEntries({
      content_type: 'post'
    }).then(response => {
      setTitle(response.items[0].fields.title);
    })
  }), []);

  return (
    <div className="App">
      <header className="App-header">
        <AmplifySignOut/>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default withAuthenticator(App);
