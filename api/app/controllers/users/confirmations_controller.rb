# TODO: Add back in
module Users
  class ConfirmationsController < Devise::ConfirmationsController
    def show
      user = User.find_by_confirmation_token!(params[:confirmation_token])
      user.confirm
      head :no_content
    end
  end
end
