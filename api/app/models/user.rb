class User < ApplicationRecord
  # TODO: add :confirmable and recoverable back in
  devise :database_authenticatable, :registerable,
         :rememberable, :validatable, :jwt_authenticatable,
         jwt_revocation_strategy: JwtDenylist
end
