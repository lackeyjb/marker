class ChangeBookmarksLinkToUrl < ActiveRecord::Migration[6.0]
  def change
    rename_column :bookmarks, :link, :url
    add_index :bookmarks, :url, unique: true
  end
end
