module Api
  module Auth
    class SessionsController < Devise::SessionsController
      before_action :load_user, only: :create

      def create
        return head :unauthorized unless @user.valid_password?(sign_in_params[:password])

        sign_in 'user', @user
        render json: { user: @user }
      end

      def destroy
        reset_token current_user
      end

      private

      def sign_in_params
        params.require(:user).permit(:email, :password)
      end

      def load_user
        @user = User.find_for_database_authentication(email: sign_in_params[:email])
        return @user if @user

        render json: { error: 'Cannot find user to sign in' }, status: :bad_request
      end

      def reset_token(user)
        user.authentication_token = nil
        user.save!
      end
    end
  end
end
