import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';

// import generateDatabase from './dbgenerator';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

// generateDatabase('https://6c7ca13f-773e-463d-9c75-5c714cf8dd87-bluemix.cloudant.com/books')
ReactDOM.render((
    <Router>
        <App />
    </Router>),
    document.getElementById('root'));
registerServiceWorker();
