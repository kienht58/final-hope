import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import ReactGA from 'react-ga';

// import generateDatabase from './dbgenerator';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactGA.initialize('UA-101745688-1');

const history = createBrowserHistory();
history.listen(function(location, action) {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});

// generateDatabase('https://6c7ca13f-773e-463d-9c75-5c714cf8dd87-bluemix.cloudant.com/books')
ReactDOM.render((
    <Router history={history}>
        <App />
    </Router>),
    document.getElementById('root'));
registerServiceWorker();
