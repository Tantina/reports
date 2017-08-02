import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';

import Routes from './router';
import reducers from './reducers';

// let showConsole = function() {
//   System.import('./components/Console/Console').then(module => {
//     module.default();
//   });
// };

const App = () => {
  const history = createHistory();
  const router = routerMiddleware(history);
  const store = createStore(reducers, {}, applyMiddleware(thunk, router));


 //   let unsubscribe = store.subscribe(() =>
 //     console.log(store.getState())
 //   );
 // store.dispatch(actions.removeReport(5))

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
