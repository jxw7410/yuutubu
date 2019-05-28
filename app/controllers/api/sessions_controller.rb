class Api::SessionsController < ApplicationController
    def email
        @email = User.find_by_email(params[:email])
        if @email 
            render json: @email
        else 
            render json: ["Email does not exist"], status: 422 
        end
    end

    def create
        @user = User.find_by_credentials(params[:user][:email],
                                          params[:user][:password])
        if @user 
            login(@user)
            render :show
        else
            render json: ["invalid Password" ], status: 422
        end
    end
   
   def destroy
        if  login? 
            logout
            render json: {}
        else
            render json: {}, status: 404
        end
   end

end