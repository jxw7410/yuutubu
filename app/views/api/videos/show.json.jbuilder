json.extract! @video, :id, :title, :description
json.thumbnailUrl  url_for(@video.thumbnail)