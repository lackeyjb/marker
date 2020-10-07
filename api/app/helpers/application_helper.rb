module ApplicationHelper
  def build_site_url(path, query_params = {})
    query = ''
    query = '?' + query_params.to_query unless query_params.empty?
    Figaro.env.web_url + path + query
  end
end
