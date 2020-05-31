class AddIsoA2ToVisitedCountries < ActiveRecord::Migration[6.0]
  def change
    add_column :visited_countries, :iso_a2, :string, null: false
  end
end
