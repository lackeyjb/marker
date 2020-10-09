# == Schema Information
#
# Table name: bookmarks
#
#  id         :bigint           not null, primary key
#  url        :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_bookmarks_on_url      (url) UNIQUE
#  index_bookmarks_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
class Bookmark < ApplicationRecord
  belongs_to :user

  # TODO: validate string for url format
  validates :url, presence: true, uniqueness: true
end
