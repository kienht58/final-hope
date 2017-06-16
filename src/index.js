import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';

import generateDatabase from './dbgenerator';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

generateDatabase('http:/localhost:5984/books')
ReactDOM.render((
    <Router>
        <App />
    </Router>),
    document.getElementById('root'));
registerServiceWorker();