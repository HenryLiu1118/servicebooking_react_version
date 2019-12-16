import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ProvideItem from './Provide_Item';
import { getServiceTypes, getLanguages } from '../../actions/userUtil';
import { getProvides } from '../../actions/provide';
import '../requests/Request_List.css';

const Provide_list = ({
  provide: { provides, size },
  userUtil: { languages, serviceTypes },
  getServiceTypes,
  getLanguages,
  getProvides
}) => {
  const [filterData, setData] = useState({
    page: 0,
    language: 'All',
    provideType: 'All'
  });

  const { page, language, provideType } = filterData;

  useEffect(() => {
    getProvides(provideType, language, page, 2);
    getServiceTypes();
    getLanguages();
    // eslint-disable-next-line
  }, [page, language, provideType]);

  const onChange = e => {
    if (e.target.name !== 'page') {
      setData({ ...filterData, [e.target.name]: e.target.value, page: 0 });
    } else {
      setData({ ...filterData, [e.target.name]: e.target.value });
    }
  };

  return (
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

      <div className="row pt-3">
        <div className="col-xs-12">
          {provides &&
            provides.map((provide, i) => (
              <ProvideItem
                key={provide.serviceId}
                provideItem={provide}
                index={i}
                provideId={provide.serviceId}
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
    </Fragment>
  );
};

const mapStateToProps = state => ({
  provide: state.provide,
  userUtil: state.userUtil
});

export default connect(mapStateToProps, {
  getServiceTypes,
  getLanguages,
  getProvides
})(withRouter(Provide_list));
