class GalleryLinkSerializer < ActiveModel::Serializer
  attributes :id, :visited_country_id, :link

  belongs_to :visited_country
end
