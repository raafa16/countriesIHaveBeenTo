class VisitedCountry < ApplicationRecord
  belongs_to :admin

  validates :iso_a3, uniqueness: { message: 'is already marked as a visited country' }
  validates :name, presence: true
end
