class Api::V1::GalleryLinksController < ApplicationController
  before_action :authenticate_admin!, only: [:create, :update, :destroy]
  before_action :set_visited_country, only: [:index, :create]
  before_action :set_gallery_link, only: [:update, :destroy]

  def index
    @gallery_links = @visited_country.gallery_links
    render json: @gallery_links
  end

  def create
    @gallery_link = @visited_country.gallery_links.build(gallery_link_params)
    if authorized?
        if @gallery_link.save
          render json: @gallery_link
        else
          render json: @gallery_link.errors, status: :unprocessable_entity
        end
    else
      handle_unauthorized
    end
  end

  def update
    if authorized?
        if @gallery_link.update(gallery_link_params)
          render json: @gallery_link
        else
          render json: @gallery_link.errors, status: :unprocessable_entity
        end
    else
        handle_unauthorized
    end
  end

  def destroy
    if authorized?
      @gallery_link.destroy
      respond_to do |format|
        format.json { head :no_content }
      end
    else
        handle_unauthorized
    end
  end

  private

  def set_visited_country
    @visited_country = VisitedCountry.find(params[:visited_country_id])
  end

  def set_gallery_link
    set_visited_country
    @gallery_link = @visited_country.gallery_links.find(params[:id])
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

  def gallery_link_params
    params.require(:gallery_link).permit(:id, :visited_country_id, :link)
  end
end
