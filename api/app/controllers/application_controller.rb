class ApplicationController < ActionController::API
  include ActionController::MimeResponds
  respond_to :json

  rescue_from ActiveRecord::RecordNotUnique, with: :render_not_unique
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

  private

  def render_not_unique(exception)
    render json: { error: exception.message }, status: :conflict
  end

  def render_unprocessable_entity(exception)
    render json: record_errors(exception), status: :unprocessable_entity
  end

  def render_not_found(exception)
    render json: { error: exception.message }, status: :not_found
  end

  def record_errors(exception)
    { errors: exception.record.errors }
  end

  # :nocov:
  # added so Rubymine doesn't issue warning
  # @return [User]
  def current_user
    super
  end

  # added so Rubymine doesn't issue warning
  def authenticate_user!
    super
  end
  # :nocov:
end
