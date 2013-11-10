class Img < ActiveRecord::Base
  attr_accessible :imgSrc
  mount_uploader :imgSrc, ImgUploader
end
