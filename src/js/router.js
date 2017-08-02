import React from 'react';
import { Route, Link } from 'react-router-dom';

import ReportPage from './components/reports/ReportPage';
import ReportForm from './components/reports/ReportForm';

// const componentRoutes = {
//   component: Home,
//   path: '/',
//   indexRoute: { component: ReportTable },
//   childRoutes: [
//     {
//       path: 'reports/new',
//       getComponent(location, cb) {
//         System.import('./components/ReportList')
//           .then(module => cb(null, module.default));
//       }
//     }
//   ]
// };

const Routes = () => (
  <div className="container">
    <h1>
      <Link to="/">Reports</Link>
    </h1>
    <Route exact path="/" component={ReportPage} />
    <Route path="/new" component={ReportForm} />
    <Route path="/edit/:id" component={ReportForm} />
  </div>
);


export default Routes;
