class AddBannerCloudUrlToBlog < ActiveRecord::Migration
  def change
    add_column :blogs, :bannerCloudurl, :string
  end
end
