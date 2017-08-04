import React from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import ReportTable from './ReportTable';
import ReportPagination from './ReportPagination';


const ReportPage = props => (
  <div>
    <LinkContainer to="/new">
      <Button>
      Create
      </Button>
    </LinkContainer>
    <ReportTable {...props} />
    <ReportPagination {...props} />
  </div>
);

export default ReportPage;
