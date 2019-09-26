import * as VideoPostApi from '../../util/video_posts_api';


export const RECEIVE_DELETE_POST = 'RECEIVE_DELETE_POST';
export const RECEIVE_POST = 'RECEIVE_POST';
export const RECEIVE_SOME_POSTS = 'RECEIVE_SOME_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';




const receiveDeletePost = post => {
  return {
    type: RECEIVE_DELETE_POST,
    post
  }
}

const receivePost = post => {
  return {
    type: RECEIVE_POST,
    post
  }
}

const receivePosts = response => {
  return {
    type: RECEIVE_POSTS,
    response
  }
}


const receiveSomePosts = response => {
  return {
    type: RECEIVE_SOME_POSTS,
    response
  }
}


export const requestCreatePost = post => dispatch => {
  return VideoPostApi.createVideoPost(post)
    .then(post => dispatch(receivePost(post)));
};

export const requestDeletePost = post_id => dispatch => {
  return VideoPostApi.deleteVideoPost(post_id)
    .then(post => dispatch(receiveDeletePost(post)));
};

export const requestSomePosts = (video_id, offset, limit) => dispatch => {
  return VideoPostApi.requestSomeVideoPosts(video_id, offset, limit)
    .then(posts => dispatch(receiveSomePosts(posts)));
}

export const requestPosts = video_id => dispatch => {
  return VideoPostApi.requestVideoPosts(video_id)
    .then(posts => dispatch(receivePosts(posts)));
}

