module ApplicationSpecHelper
  def be_json(value)
    eq value.to_json
  end
end
