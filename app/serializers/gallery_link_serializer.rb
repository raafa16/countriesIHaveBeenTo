class GalleryLinkSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :visited_country_id, :link, :created_at, :updated_at
end
