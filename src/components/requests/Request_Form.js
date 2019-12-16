import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getServiceTypes } from '../../actions/userUtil';
import { PostRequest, UpdateRequest } from '../../actions/request';
import { withRouter } from 'react-router-dom';

const Request_Form = ({
  serviceTypes,
  request: { requests },
  getServiceTypes,
  PostRequest,
  UpdateRequest,
  match,
  history
}) => {
  const [formData, setFormData] = useState({
    info: '',
    servicetype: ''
  });
  const { servicetype, info } = formData;

  const [urlData, setUrlData] = useState({
    editMode: false,
    requestId: null
  });
  const { editMode, requestId } = urlData;

  useEffect(() => {
    getServiceTypes();
    if (match.params.id) {
      let ids = match.params.id.split('|');
      let index = +ids[0];
      let current = requests[index];
      setUrlData({
        requestId: +ids[1],
        editMode: true
      });
      setFormData({
        servicetype: current.servicetype,
        info: current.info
      });
    } else {
      setUrlData({
        ...urlData,
        editMode: false
      });
    }
    // eslint-disable-next-line
  }, [match.url]);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (editMode) {
      UpdateRequest(requestId, formData, history);
    } else {
      PostRequest(formData, history);
    }
  };

  return (
    <Fragment>
      <div className="container bg-white shadow-sm">
        <form className="px-3 py-3" onSubmit={e => onSubmit(e)}>
          {editMode ? (
            <h2 className="text-center font_color py-3">Update Request</h2>
          ) : (
            <h2 className="text-center font_color py-3">Post New Request</h2>
          )}
          <hr />

          <div className="form-group">
            <label htmlFor="servicetype" className="pr-2 h6">
              Service Type
            </label>
            <select
              required
              id="servicetype"
              name="servicetype"
              value={servicetype}
              onChange={e => onChange(e)}
            >
              {serviceTypes &&
                ['', ...serviceTypes].map(serviceTypeItem => (
                  <option key={serviceTypeItem} value={serviceTypeItem}>
                    {serviceTypeItem}
                  </option>
                ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="info" className="h6">
              Request Detail
            </label>
            <textarea
              required
              className="form-control"
              type="message"
              id="info"
              rows="4"
              placeholder="Enter request details..."
              name="info"
              value={info}
              onChange={e => onChange(e)}
            ></textarea>
          </div>
          <div className="text-center py-4">
            <button
              type="submit"
              className="btn btn_background text-white px-3 py-1"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  serviceTypes: state.userUtil.serviceTypes,
  request: state.request
});

export default connect(mapStateToProps, {
  getServiceTypes,
  PostRequest,
  UpdateRequest
})(withRouter(Request_Form));
