import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getComments } from '../../actions/comment';

const Comments = ({ requestId, getComments, comment: { comments } }) => {
  useEffect(() => {
    getComments(requestId);
    // eslint-disable-next-line
  }, [requestId]);
  return (
    <Fragment>
      <div className="card bg-white border-top-0 shadow-sm">
        <div className="h5 pt-2 px-2">Comments: </div>
        {comments &&
          comments.map(commentItem => (
            <Fragment key={commentItem.commentId}>
              <div className="card px-2 py-2 border-0">
                <div>
                  <span className="comment-text-color h6">
                    @{commentItem.userdto.firstname}{' '}
                    {commentItem.userdto.lastname}:{' '}
                  </span>
                  <span className=" h6">{commentItem.commentDetail}</span>
                </div>
                <div className="pt-1">
                  <div className="text-muted pl-5 pt-1">
                    Location: {commentItem.userdto.streetname},{' '}
                    {commentItem.userdto.city}, {commentItem.userdto.state},{' '}
                    {commentItem.userdto.zipcode}
                  </div>
                  <div className="text-muted pl-5 pt-1">
                    Phone: {commentItem.userdto.phone}
                  </div>
                  <div className="text-muted pl-5 pt-1">
                    Language: {commentItem.userdto.language}
                  </div>
                </div>
              </div>
            </Fragment>
          ))}
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  request: state.request,
  comment: state.comment
});

export default connect(mapStateToProps, { getComments })(Comments);
