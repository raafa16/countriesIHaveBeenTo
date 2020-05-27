class CreateVisitedCountries < ActiveRecord::Migration[6.0]
  def change
    create_table :visited_countries do |t|
      t.string :name, null: false
      t.references :admin, null: false, foreign_key: true, index: true
      t.string :iso_a3, null: false

      t.timestamps
    end
    add_index :visited_countries, :iso_a3, unique: true
  end
end

