import React from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import ReportTable from './ReportTable';
import ReportPagination from './ReportPagination';
import ReportTableSettings from './ReportTableSettings';


const ReportPage = props => (
  <div>
    <LinkContainer to="/new">
      <Button>
      Create
      </Button>
    </LinkContainer>
    <ReportTableSettings />
    <ReportTable {...props} />
    <ReportPagination {...props} />
  </div>
);

export default ReportPage;
