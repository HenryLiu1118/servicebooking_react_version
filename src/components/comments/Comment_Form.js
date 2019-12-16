import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { checkDuplicateComment, postComment } from '../../actions/comment';

const Comment_Form = ({
  requestId,
  checkDuplicateComment,
  postComment,
  comment: { myComment }
}) => {
  const [formData, setFormData] = useState({
    detail: ''
  });
  const { detail } = formData;

  useEffect(() => {
    checkDuplicateComment(requestId);
    // eslint-disable-next-line
  }, [requestId]);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = e => {
    e.preventDefault();
    postComment(formData, requestId);
  };
  return (
    <Fragment>
      <div className="card bg-white border-top-0 shadow-sm">
        {myComment ? (
          <div className="pb-3 pl-2">
            <hr />
            <div className="text-danger">You have commented already!</div>
            <div className="text-dark">Comment: {myComment.commentDetail}</div>
          </div>
        ) : (
          <form className="form-row pl-2 pb-3" onSubmit={e => onSubmit(e)}>
            <div className="col-10 pl-3">
              <input
                required
                type="text"
                id="detail"
                className="form-control"
                name="detail"
                value={detail}
                onChange={e => onChange(e)}
                placeholder="Please leave a comment..."
              />
            </div>
            <div className="col">
              <button type="submit" className="btn btn_background text-white">
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user,
  comment: state.comment
});

export default connect(mapStateToProps, { checkDuplicateComment, postComment })(
  Comment_Form
);
