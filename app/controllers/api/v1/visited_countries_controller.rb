class Api::V1::VisitedCountriesController < ApplicationController
  before_action :authenticate_admin!, :set_visited_country, only: [:show, :edit, :update, :destroy]

  def index
    @visited_countries = current_admin.visited_countries.all
  end
  def show
    if authorized?
      respond_to do |format|
        format.json { render :show }
      end
    else
        handle_unauthorized
    end
  end

  def create
    @visited_country = current_user.visited_countries.build(visited_country_params)
    if authorized?
      respond_to do |format|
        if @visited_country.save
          format.json { render :show, status: :created, location: api_v1_visited_country_path(@visited_country) }
        else
          format.json { render json: @visited_country.errors, status: :unprocessable_entity }
        end
      end
    else
      handle_unauthorized
    end
  end

  def update
  end

  def destroy
    if authorized?
      @visited_country.destroy
      respond_to do |format|
        format.json { head :no_content }
      end
    else
        handle_unauthorized
    end
  end

  private

  def set_visited_country
    @visited_country = current_admin.visited_countries.find(params[:id])
  end

  def authorized?
    @visited_country.admin == current_admin
  end

  def handle_unauthorized
    unless authorized?
      respond_to do |format|
        format.json { render :unauthorized, status: 401 }
      end
    end
  end

  def visited_country_params
    params.require(:visited_country).permit(:name, :iso_a3)
  end
end
