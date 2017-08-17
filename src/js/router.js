import React from 'react';
import { Route, Link } from 'react-router-dom';

/*eslint-disable */
import LoadReportPage from 'bundle-loader?lazy!./components/reports/ReportPage';
import LoadReportForm from 'bundle-loader?lazy!./components/reports/ReportForm';
/*eslint-enable */
import Bundle from './components/common/Bundle';


const ReportPage = props => (
  <Bundle load={LoadReportPage}>
    {ReportPage => <ReportPage {...props} />}
  </Bundle>
);

const ReportForm = props => (
  <Bundle load={LoadReportForm}>
    {ReportForm => <ReportForm {...props} />}
  </Bundle>
);

const Routes = () => (
  <div className="container">
    <h1>
      <Link to={{ pathname: '/reports' }}>Reports</Link>
    </h1>
    <Route exact path="/reports" component={ReportPage} />
    <Route path="/new" component={ReportForm} />
  </div>
);


export default Routes;
