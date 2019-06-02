@channels.each do |channel|
    json.set! channel.id do 
        json.extract! channel, :id, :name, :user_id
    end
end