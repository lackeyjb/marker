# TODO: add request tests
class BookmarksController < ApplicationController
  before_action :authenticate_user!
  before_action :load_bookmark, only: %i[show destroy update]
  before_action :check_user, only: %i[destroy update]

  def create
    bookmark = current_user.bookmarks.create!(bookmark_params)
    render status: :created, json: bookmark
  end

  # TODO: paginate
  def index
    render json: current_user.bookmarks
  end

  def show
    render json: @bookmark
  end

  def update
    @bookmark.update!(bookmark_params)
    head :no_content
  end

  def destroy
    @bookmark.destroy
    head :no_content
  end

  private

  def bookmark_params
    params.require(:bookmark).permit(:url)
  end

  def load_bookmark
    @bookmark = Bookmark.find_by!(id: params[:id])
  end

  def check_user
    head :forbidden unless current_user.owner_of?(@bookmark)
  end
end
