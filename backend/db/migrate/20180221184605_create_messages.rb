class CreateMessages < ActiveRecord::Migration[5.1]
  def change
    create_table :messages do |t|
      t.belongs_to :active_game, foreign_key: true
      t.string :text

      t.timestamps
    end
  end
end
