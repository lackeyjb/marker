class AuthFailure < Devise::FailureApp
  protected

  def http_auth_body
    return super unless request_format == :json

    { message: i18n_message }.to_json
  end
end
