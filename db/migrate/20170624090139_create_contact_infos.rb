class CreateContactInfos < ActiveRecord::Migration[5.1]
  def change
    create_table :contact_infos do |t|
      t.string :name
      t.string :address
      t.integer :phone
      t.integer :mobile
      t.string :email

      t.timestamps
    end
  end
end
