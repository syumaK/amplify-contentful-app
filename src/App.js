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
import Amplify, { Analytics } from 'aws-amplify';
import config from './aws-exports';

/*
set contentful client
*/
export const client = contentful.createClient({
  space: 'f4fml958i6ja',
  accessToken: '-wPI83bY_UbhRMCf9HOA3TiXdmMnxfFisHtbonuD_Ug'
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

  // Button for events
  function submitEvents (){
  
    Analytics.record({
      name:'userVisit',
      attributes: { name : 'Stefan', location: 'Berlin'}
    });
    
    Analytics.record({
      name:'siteVisit',
      attributes: { name : 'webinar', month: 'Nov'}
    });
  }

  return (
    <div className="App">
      <header className="App-header">
      <AmplifySignOut/>
        { title ? title : 'Loading...' }
      
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={submitEvents}>SubmitEvents</button>
      </header>
    </div>
  );
}

export default withAuthenticator(App);
