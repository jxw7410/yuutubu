import * as VideoPostApi from '../../util/video_posts_api';
export const RECEIVE_DELETE_POST = 'RECEIVE_DELETE_POST';
export const RECEIVE_POST = 'RECEIVE_POST';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const REMOVE_POSTS = 'REMOVE_POSTS';
export const RECEIVE_REPLY = 'RECEIVE_REPLY';
export const RECEIVE_REPLIES = 'RECEIVE_REPLIES';

const receiveDeletePost = (postId, parentId)=> ({
    type: RECEIVE_DELETE_POST,
    parentId,
    postId
});

const receivePost = post => ({
    type: RECEIVE_POST,
    post
});

const receivePosts = posts => ({
    type: RECEIVE_POSTS,
    posts
});

const removePosts = {
  type: REMOVE_POSTS
};

const receiveReply = response => ({
  type: RECEIVE_REPLY,
  parentId: response.parentId,
  reply: response.reply,
});

const receiveReplies = response => ({
  type: RECEIVE_REPLIES,
  parentId: response.parentId,
  replies: response.replies,
})

export const requestCreatePost = post => dispatch => {
  return VideoPostApi.createVideoPost(post)
    .then(post => dispatch(receivePost(post)));
};

export const requestUpdateComment = post => dispatch => {
  return VideoPostApi.updateVideoPost(post)
    .then(res => {
      if (post.parent_id){
        dispatch(receiveReply({
          parentId: post.parent_id,
          reply: res
        }));
      } else {
        dispatch(receivePost(res));
      } 
  });
}

export const requestDeletePost = (postId, parentId) => dispatch => {
  return VideoPostApi.deleteVideoPost(postId)
    .then(() => dispatch(receiveDeletePost(postId, parentId)));
};

export const requestPosts = params => dispatch => {
  return VideoPostApi.requestVideoPosts(params)
    .then(posts => dispatch(receivePosts(posts)))
}

export const requestRemovePost = () => dispatch => (
  new Promise( resolve => {
    dispatch(removePosts);
    resolve();
  })
)

export const requestCreateReply = post => dispatch => {
  return VideoPostApi.createVideoPost(post)
    .then(reply => dispatch(receiveReply({
      parentId: post.parent_id, 
      reply
    })));
}

export const requestReplies = postId => dispatch => {
  return VideoPostApi.fetchVideoPostReplies(postId)
    .then(replies => dispatch(receiveReplies({
      parentId: postId,
      replies
    })));
}