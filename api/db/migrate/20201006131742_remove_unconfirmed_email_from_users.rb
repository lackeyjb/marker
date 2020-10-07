class RemoveUnconfirmedEmailFromUsers < ActiveRecord::Migration[6.0]
  def change
    remove_column :users, :unconfirmed_email
  end
end
