import React from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import ReportTable from './ReportTable';

const ReportPage = () => (
  <div>
    <LinkContainer to="/new">
      <Button>
      Create
      </Button>
    </LinkContainer>
    <ReportTable />
  </div>
);

export default ReportPage;
