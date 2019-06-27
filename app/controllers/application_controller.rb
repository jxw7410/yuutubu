class ApplicationController < ActionController::Base
    helper_method :current_user, :login?, :ensure_login

    def current_user 
        @current_user ||= User.find_by_session_token(session[:session_token])
    end

    def login?
        !!current_user
    end

    def login user
        @current_user = user
        session[:session_token] = @current_user.reset_session
    end

    def logout
        current_user.reset_session
        session[:session_token] = nil
        @current_user = nil 
    end


    def ensure_login
        render json: ['Forbidden'], status: 403 unless login?
    end


end
