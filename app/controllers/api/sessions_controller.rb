class Api::SessionsController < ApplicationController
    def email
        @user = User.verify_email(email_params[:email].downcase)
        if @user
            render :email
        else 
            render json: ["Email does not exist"], status: 422 
        end
    end

    def create
        @user = User.find_by_credentials(params[:user][:email].downcase,
            params[:user][:password])

        if @user 
            login(@user)
            render :show
        else
            render json: ["Invalid Password" ], status: 422
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

   private
   
    def email_params
        params.require(:email).permit(:email)
    end
end