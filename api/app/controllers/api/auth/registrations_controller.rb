module Api
  module Auth
    class RegistrationsController < Devise::RegistrationsController
      def create
        user = User.new user_params
        user.save!
        render json: { user: user }, status: :created
      end

      private

      def user_params
        params.require(:user).permit(:email, :password, :password_confirmation)
      end
    end
  end
end
