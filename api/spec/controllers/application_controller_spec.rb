require 'rails_helper'

RSpec.describe ApplicationController, type: :controller do
  controller do
    def index
      raise ActiveRecord::RecordNotUnique, 'not unique'
    end

    def show
      raise ActiveRecord::RecordNotFound, 'not found'
    end

    def update
      # We're just using User here to test. Could be any other model
      user = User.new
      user.errors.add(:email, 'wrong')
      invalid_error = ActiveRecord::RecordInvalid.new user
      raise invalid_error
    end
  end

  it do
    is_expected.to rescue_from(ActiveRecord::RecordNotUnique)
      .with(:render_not_unique)
  end

  it do
    is_expected.to rescue_from(ActiveRecord::RecordInvalid)
      .with(:render_unprocessable_entity)
  end

  it do
    is_expected.to rescue_from(ActiveRecord::RecordNotFound)
      .with(:render_not_found)
  end

  describe '#render_not_unique' do
    it 'renders error and 409' do
      get :index
      expect(response).to have_http_status(:conflict)
      expect(response.body).to be_json(error: 'not unique')
    end
  end

  describe '#render_not_found' do
    it 'renders error and 404' do
      get :show, params: { id: 1 }
      expect(response).to have_http_status(:not_found)
      expect(response.body).to be_json(error: 'not found')
    end
  end

  describe '#render_unprocessable_entity' do
    it 'renders error and 422' do
      put :update, params: { id: 2 }
      expect(response).to have_http_status(:unprocessable_entity)
      expect(response.body).to be_json(errors: { email: ['wrong'] })
    end
  end
end
