require 'net/http'
require 'json'

class BooksController < ApplicationController
  def search
    query = params[:q]
    url = URI::HTTPS.build(
      host: "www.googleapis.com",
      path: "/books/v1/volumes",
      query: { q: query }.to_query
    )
    
    response = Net::HTTP.get(url)
    render json: JSON.parse(response)
  end
end
