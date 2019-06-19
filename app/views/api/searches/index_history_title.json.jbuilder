@videos.each do |video|
    json.set! video.id do 
        json.extract! video, :title
    end
end


