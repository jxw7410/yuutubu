class Api::VideosController < ApplicationController
    def show
        render json: ['No token'], status: 404
    end
end



