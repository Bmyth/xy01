class NexusController < ApplicationController
  def index
  end

  def blogGet
    render :json => (Blog.find :all).to_json
  end

  def imgAdd
    img = Img.create! params[:img]
    imgName = "img_" + img.id.to_s
    Cloudinary::Uploader.upload("public" + img.imgSrc_url, :public_id => imgName, :format => 'jpg')
    render :json => {:cloudUrl => "http://res.cloudinary.com/hd8ndypc8/image/upload/" + imgName + ".jpg"}
  end

  def blogAdd
    if params[:blog][:id] == '-1'
      blog = Blog.create! params[:blog]
    else
    end
    render :json => blog
  end
end
