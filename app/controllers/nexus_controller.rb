class NexusController < ApplicationController
  def index
    @envparam =  ENV['VCAP_SERVICES']
  end

  def blogsFetch
    render :json => (Blog.find :all).to_json
  end

  def imgCreate
      img = Img.create! params[:img]
      imgName = "img_" + img.id.to_s
      Cloudinary::Uploader.upload("public" + img.imgSrc_url, :public_id => imgName, :format => 'jpg')
      render :json => {:cloudUrl => "http://res.cloudinary.com/hd8ndypc8/image/upload/" + imgName + ".jpg"}
  end

  def blogCreate
      blog = Blog.create!
      blog.title = params[:title]
      blog.content = params[:content]
      blog.bannerCloudurl = params[:bannerCloudurl]
      blog.save!
      render :json => blog
  end

  def blogUpdate
      blog = Blog.find(params[:id])
      if blog
        blog.title = params[:title]
        blog.content = params[:content]
        blog.bannerCloudurl = params[:bannerCloudurl]
        blog.save!
        render :json => blog
      else
        blogCreate
      end
  end

  def blogDelete
      blog = Blog.find(params[:id])
      blog.destroy
      render :json => {:success => 'y'}
  end

  def accountValidate
    if (params[:password] == "142857")
      session[:login_at] = Time.now
      render :json => {:validated => true}
    else
      render :json => {:validated => false}
    end
  end

  def accountRegist
    if session[:login_at].nil?
      session[:login_at] = Time.now
      render :json => {:info => 'registed'}
    else
      render :json => {:info => 'already loggedin'}
    end
  end
end
