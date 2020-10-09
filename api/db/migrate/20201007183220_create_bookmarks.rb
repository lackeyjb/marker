class CreateBookmarks < ActiveRecord::Migration[6.0]
  def change
    create_table :bookmarks do |t|
      t.string :link, unique: true, null: false
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
