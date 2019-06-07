# Yuutubu
    Yuutubu is an app built in the likeness of Youtube. Youtube is a video hosting website and it is the 2nd most popular website in world.
    [Link to heroku page]{https://yuutubu.herokuapp.com/}

## Technologies
    While Youtube is built with Angular (Google using their own product, how unexpected!), 
    Yuutubu is build with using React/Redux on JS for the frontend, Ruby on Rails for the backend, and postgresql for the database.

## Features

### Users
 * Users can sign up and login 
   
 * Users can upload videos 
 * Users can post comments, and like/dislike videos
  
### Channel
 * Every User has a Channel
 * Channel Home page always displays one video from the User, if there is one.
 * Channel Video page displays all videos from the User


 
### Videos
 * Videos are streamed off AWS
 * Main video player has a custom built UI bar
 * Have comments
 * Can be liked/disliked by users

### Video Thumbnails
 * Thumbnails can render a portion of a video

### Uploading Video
 * Video Upload automatically generates a thumbnail for the user

### Comments
 * Users can post comments on videos 
 * Users who own comments can delete their comments

