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
require 'rails_helper'

RSpec.describe JwtDenylist, type: :model do
  it { is_expected.to validate_presence_of(:jti) }
  it { is_expected.to validate_presence_of(:exp) }
  it { is_expected.to have_db_index(:jti) }
end
