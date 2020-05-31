class CreateGalleryLinks < ActiveRecord::Migration[6.0]
  def change
    create_table :gallery_links do |t|
      t.string :link, null: false
      t.references :visited_country, null: false, foreign_key: true, index: true
      t.timestamps
    end
  end
end
