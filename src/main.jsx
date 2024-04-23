import React from 'react'
import ReactDOM from 'react-dom/client'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import App from './App.jsx'
import './index.css'
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ApolloProvider } from '@apollo/client';
import client from './store';


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App/>
            <ToastContainer/>
        </ApolloProvider>
    </React.StrictMode>,
)
