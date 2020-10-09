require 'rails_helper'

RSpec.describe ApplicationHelper do
  describe '#build_site_url' do
    url = Figaro.env.web_url + '/test'

    it 'adds path to site url' do
      path = helper.build_site_url('/test')
      expect(path).to eq(url)
    end

    it 'adds query parameters to path' do
      path = helper.build_site_url('/test', one: 1)
      expect(path).to eq(url + '?one=1')
    end
  end
end
