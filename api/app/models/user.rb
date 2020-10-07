class User < ApplicationRecord
  acts_as_token_authenticatable

  devise :confirmable, :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
