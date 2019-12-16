import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { adminGetLanguages } from '../../../actions/admin';

const Language_List = ({ languages, adminGetLanguages }) => {
  useEffect(() => {
    adminGetLanguages();
    // eslint-disable-next-line
  }, []);
  return (
    <Fragment>
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Language Type</th>
          </tr>
        </thead>
        <tbody>
          {languages &&
            languages.map(language => (
              <tr key={language.id}>
                <th scope="row">{language.id}</th>
                <td> {language.name}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  languages: state.admin.languages
});

export default connect(mapStateToProps, { adminGetLanguages })(Language_List);
