class CreateImgs < ActiveRecord::Migration
  def change
    create_table :imgs do |t|
      t.string   "imgSrc"
      t.timestamps
    end
  end
end
