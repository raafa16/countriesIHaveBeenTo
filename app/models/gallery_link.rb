class GalleryLink < ApplicationRecord
  # associoations
  belongs_to :visited_country

  # validations
  validates :link, presence: true
end
