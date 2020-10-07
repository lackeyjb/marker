class ApplicationController < ActionController::API
  rescue_from ActiveRecord::RecordNotUnique, with: :render_not_unique
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

  acts_as_token_authentication_handler_for User

  private

  def render_not_unique(exception)
    render json: record_errors(exception), status: :conflict
  end

  def render_unprocessable_entity(exception)
    render json: record_errors(exception), status: :conflict
  end

  def render_not_found(exception)
    render json: { error: exception.message }, status: :not_found
  end

  def record_errors(exception)
    { errors: exception.record.errors }
  end

  # For Rubymine to stop yelling at me
  # @return [User]
  def current_user
    super
  end
end
