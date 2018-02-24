class CreateActiveGames < ActiveRecord::Migration[5.1]
  def change
    create_table :active_games do |t|
      t.belongs_to :user, foreign_key: true
      t.belongs_to :game, foreign_key: true
      t.integer :position
      t.string :ability
      t.string :treasure_cards, array: true
      t.boolean :ready_to_start, default: false

      t.timestamps
    end
  end
end
