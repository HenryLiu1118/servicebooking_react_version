import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import RequestItem from './Request_Item';
import { GetRequests } from '../../actions/request';
import { withRouter } from 'react-router-dom';
import './Request_List.css';

const Request_List = ({
  auth: { user },
  request: { requests, size, loading },
  userUtil: { languages, serviceTypes },
  GetRequests,
  match,
  history
}) => {
  const [filterData, setData] = useState({
    page: 0,
    language: 'All',
    provideType: 'All'
  });

  const { page, language, provideType } = filterData;

  useEffect(() => {
    GetRequests(user.role, provideType, language, page, 2);
    // eslint-disable-next-line
  }, [page, language, provideType]);

  const onNewRequest = () => {
    history.push(`${match.url}/new`);
  };

  const onChange = e => {
    console.log(e.target.name);
    if (e.target.name !== 'page') {
      setData({ ...filterData, [e.target.name]: e.target.value, page: 0 });
    } else {
      setData({ ...filterData, [e.target.name]: e.target.value });
    }
  };

  return loading ? (
    <div>
      <h1>Loading...</h1>
    </div>
  ) : (
    <Fragment>
      <div>
        {user && user.role === 'Customer' && (
          <div className="text-left">
            <button
              className="btn btn_background text-white"
              id="post_button"
              onClick={onNewRequest}
            >
              Post New Request
            </button>
          </div>
        )}
        {user && user.role === 'Service' && (
          <Fragment>
            <div className="py-1">
              <span>Service Type: </span>
              <select
                className="select_custom"
                name="provideType"
                value={provideType}
                onChange={e => onChange(e)}
              >
                {serviceTypes &&
                  ['All', ...serviceTypes].map(serviceTypeItem => (
                    <option key={serviceTypeItem} value={serviceTypeItem}>
                      {serviceTypeItem}
                    </option>
                  ))}
              </select>
            </div>
            <div className="py-2">
              <span>Lanugage: </span>
              <select
                className="select_custom"
                name="language"
                value={language}
                onChange={e => onChange(e)}
              >
                {languages &&
                  ['All', ...languages].map(languageItem => (
                    <option key={languageItem} value={languageItem}>
                      {languageItem}
                    </option>
                  ))}
              </select>
            </div>
          </Fragment>
        )}

        <div className="row pt-3">
          <div className="col-xs-12">
            {requests &&
              requests.map((request, i) => (
                <RequestItem
                  key={request.requestId}
                  requestItem={request}
                  index={i}
                  requestId={request.requestId}
                />
              ))}
          </div>
        </div>

        <div className="pt-2 pr-4 float-right">
          <span className="mt-2 pr-1">
            <select
              className="select_custom text-secondary"
              name="page"
              value={page}
              onChange={e => onChange(e)}
            >
              {[...Array(Math.ceil(size / 2)).keys()].map(pageNum => (
                <option key={pageNum} value={+pageNum}>
                  {+pageNum + 1}
                </option>
              ))}
            </select>
          </span>
          {page > 0 && (
            <span className="pr-2">
              <button
                className="btn btn-sm btn-secondary"
                onClick={() => {
                  setData({ ...filterData, page: page - 1 });
                }}
              >
                Prev
              </button>
            </span>
          )}
          {(page + 1) * 2 < size && (
            <span className="pr-2">
              <button
                className="btn btn-sm btn-secondary"
                onClick={() => {
                  setData({ ...filterData, page: page + 1 });
                }}
              >
                Next
              </button>
            </span>
          )}
        </div>
        <div className="pt-1 pr-5 float-left">
          <span className="pl-1 text-secondary">Page: {+page + 1}</span>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  request: state.request,
  userUtil: state.userUtil
});

export default connect(mapStateToProps, {
  GetRequests
})(withRouter(Request_List));
