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

  def show
    book_id = params[:id]

    url = URI::HTTPS.build(
      host: "www.googleapis.com",
      path: "/books/v1/volumes/#{book_id}"
    )

    response = Net::HTTP.get(url)
    data = JSON.parse(response)

    info = data["volumeInfo"]
    book = {
      title: info["title"],
      authors: info["authors"],
      published_date: info["publishedDate"],
      description: info["description"],
      thumbnail: info.dig("imageLinks", "thumbnail"),
      info_link: info["infoLink"]
    }

    render json: { book: book }
  end

end
