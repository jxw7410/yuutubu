class Api::SessionsController < ApplicationController
  def email
    @user = User.verify_email(params[:email])
    if @user
      render :email
    else
      render json: ["Email does not exist"], status: 422
    end
  end

  def create
    @user = User.find_by_credentials(params[:user][:email],
                                     params[:user][:password])

    if @user
      login(@user)
      @channel = @user.user_channels.first
      render :show
    else
      render json: ["Invalid Password"], status: 422
    end
  end

  def destroy
    if login?
      logout
      render json: {}
    else
      render json: {}, status: 404
    end
  end

  
end
