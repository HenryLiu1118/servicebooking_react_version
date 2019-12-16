import React, { Fragment } from 'react';
import LanguageList from './Language_List';
import LanguageForm from './Language_Form';

function Languages() {
  return (
    <Fragment>
      <div className="container-fluid container-fluid-admin">
        <div className="text-center pb-5">
          <LanguageForm />
        </div>
        <div className="py-4 bg-white border border-dark">
          <h3 className="text-center pb-3">All Languages</h3>
          <LanguageList />
        </div>
      </div>
    </Fragment>
  );
}

export default Languages;
