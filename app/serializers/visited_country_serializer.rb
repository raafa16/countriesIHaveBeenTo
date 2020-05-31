class VisitedCountrySerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name, :admin_id, :iso_a2, :iso_a3, :created_at, :updated_at

  has_many :gallery_links
end
