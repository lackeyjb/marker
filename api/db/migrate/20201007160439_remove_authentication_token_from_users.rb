class RemoveAuthenticationTokenFromUsers < ActiveRecord::Migration[6.0]
  def change
    remove_index :users, :authentication_token
    remove_column :users, :authentication_token
  end
end
