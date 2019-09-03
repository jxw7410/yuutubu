json.searches do
    if @videos 
        @videos.each do |video|
            json.set! video.id do 
                json.extract! video, :title, :name
            end
        end
    else  
        json.null!
    end
end

json.history do 
    if @histories 
        @histories.each do |history|
            json.set! history.id do 
                json.extract! history, :id, :context, :category, :updated_at
            end
        end
    else 
        json.null!
    end
end

