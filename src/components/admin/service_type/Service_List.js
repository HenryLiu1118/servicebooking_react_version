import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { adminGetServiceType } from '../../../actions/admin';

const Service_List = ({ serviceTypes, adminGetServiceType }) => {
  useEffect(() => {
    adminGetServiceType();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Service Type</th>
          </tr>
        </thead>
        <tbody>
          {serviceTypes &&
            serviceTypes.map(serviceType => (
              <tr key={serviceType.id}>
                <th scope="row">{serviceType.id}</th>
                <td> {serviceType.name}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = state => ({
  serviceTypes: state.admin.serviceTypes
});

export default connect(mapStateToProps, { adminGetServiceType })(Service_List);
