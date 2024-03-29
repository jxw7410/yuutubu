class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
      @channel = UserChannel.create(name: @user.username, user: @user)
      render :show
    else
      render json: @user.errors.full_messages, status: 402
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :email)
  end
end
