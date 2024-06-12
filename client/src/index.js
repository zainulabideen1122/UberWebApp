import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GoogleOAuthProvider clientId='599482580299-25f2th6dnul61sa0c7ljgs3homaf17k9.apps.googleusercontent.com'>
        <App />
    </GoogleOAuthProvider>
);


