class Api::V1::AuthController < ApplicationController
  def logged_in?
    if current_admin
      render json: {
        logged_in: true,
      }
    else
      render json: {
        logged_in: false,
      }
    end
  end
end
