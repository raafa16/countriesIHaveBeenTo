class Api::V1::VisitedCountriesController < ApplicationController
  before_action :authenticate_admin!, :set_visited_country, only: [:create, :destroy]

  def index
    @visited_countries = VisitedCountry.all
    VisitedCountrySerializer.new(@visited_countries).serializable_hash.to_json
  end

  def create
    @visited_country = current_admin.visited_countries.build(visited_country_params)
    if authorized?
      respond_to do |format|
        if @visited_country.save
          VisitedCountrySerializer.new(@visited_country).serializable_hash.to_json
        else
          format.json { render json: @visited_country.errors, status: :unprocessable_entity }
        end
      end
    else
      handle_unauthorized
    end
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
