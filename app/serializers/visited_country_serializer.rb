class VisitedCountrySerializer < ActiveModel::Serializer
  attributes :id, :name, :iso_a2, :iso_a3

  has_many :gallery_links
end
