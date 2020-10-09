# == Schema Information
#
# Table name: jwt_denylist
#
#  id         :bigint           not null, primary key
#  exp        :datetime         not null
#  jti        :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_jwt_denylist_on_jti  (jti)
#
FactoryBot.define do
  factory :jwt_denylist do
    jti { 'MyString' }
    exp { '2020-10-07 14:04:14' }
  end
end
