class ChangeContentFieldForBlogs < ActiveRecord::Migration
  def up
    change_column :blogs, :content, :text
  end

  def down
    change_column :blogs, :content, :string
  end
end
