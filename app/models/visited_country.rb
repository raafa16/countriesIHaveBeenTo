class VisitedCountry < ApplicationRecord
  # associations
  belongs_to :admin
  has_many :gallery_links, dependent: :destroy

  # validations
  validates :iso_a3, uniqueness: { message: 'is already marked as a visited country' }
  validates :name, presence: true
end
