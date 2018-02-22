class GameSerializer < ActiveModel::Serializer
  attributes :id, :name, :water_level, :flood_cards, :flood_discards, :treasure_discards
  has_many :tiles
  has_many :active_games
  has_many :users, through: :active_games
  has_many :messages, through: :active_games
end
