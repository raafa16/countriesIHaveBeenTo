class Api::V1::GalleryLinksController < ApplicationController
  before_action :authenticate_admin!, only: [:create, :update, :destroy]
  before_action :set_visited_country, only: [:create]
  before_action :set_gallery_link, only: [:update, :destroy]

  def create
    @gallery_link = @visited_country.gallery_links.build(gallery_link_params)
    if authorized?
      respond_to do |format|
        if @gallery_link.save
          GalleryLinkSerializer.new(@gallery_link).serializable_hash.to_json
        else
          format.json { render json: @gallery_link.errors, status: :unprocessable_entity }
        end
      end
    else
      handle_unauthorized
    end
  end

  def update
    if authorized?
      respond_to do |format|
        if @gallery_link.update(gallery_link_params)
          GalleryLinkSerializer.new(@gallery_link).serializable_hash.to_json
        else
          format.json { render json: @gallery_link.errors, status: :unprocessable_entity }
        end
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
    @visited_country = current_admin.visited_countries.find(params[:visited_country_id])
  end

  def set_gallery_link
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
