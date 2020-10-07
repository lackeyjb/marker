FactoryBot.define do
  factory :jwt_denylist do
    jti { "MyString" }
    exp { "2020-10-07 14:04:14" }
  end
end
