class Game < ApplicationRecord
  has_many :active_games
  has_many :users, through: :active_games
  has_many :messages, through: :active_games
  has_many :tiles

  after_create :generate_flood_cards

  def draw_flood_cards # draws flood cards and places in flood discard pile. returns drawn cards.
    self.water_level.times do
      self.flood_discards << self.flood_cards.shift
    end
    self.flood_discards[0..(self.water_level-1)]
  end


  def generate_flood_cards
    self.flood_cards = [
      "Temple of the Sun",
      "Cave of Embers",
      "Coral Palace",
      "Tidal Palace",
      "Cobalt Gate",
      "Howling Garden",
      "Whispering Garden",
      "Temple of the Moon",
      "Cave of Shadows",
      "Copper Gate",
      "Iron Gate",
      "Silver Gate",
      "Gold Gate",
      "Twilight Hollow",
      "Observatory",
      "Watchtower",
      "Lost Lagoon",
      "Cliffs of Abandon",
      "Fools' Landing",
      "Phantom Rock",
      "Dunes of Deception",
      "Crimson Forest",
      "Breakers Bridge",
      "Misty Marsh"
    ].shuffle
    self.flood_discards = []
    self.treasure_cards = [
      "The Earth Stone",
      "The Earth Stone",
      "The Earth Stone",
      "The Earth Stone",
      "The Earth Stone",
      "The Statue of the Wind",
      "The Statue of the Wind",
      "The Statue of the Wind",
      "The Statue of the Wind",
      "The Statue of the Wind",
      "The Crystal of Fire",
      "The Crystal of Fire",
      "The Crystal of Fire",
      "The Crystal of Fire",
      "The Crystal of Fire",
      "The Ocean's Chalice",
      "The Ocean's Chalice",
      "The Ocean's Chalice",
      "The Ocean's Chalice",
      "The Ocean's Chalice",
      "Sandbag",
      "Sandbag",
      "Helicopter Lift",
      "Helicopter Lift",
      "Helicopter Lift",
      "Waters Rise!",
      "Waters Rise!",
      "Waters Rise!"
    ].shuffle
    self.treasure_discards = []
    self.generate_tiles
  end

  def generate_tiles
    self.flood_cards.each do |tile_name|
      Tile.create(game: self, status: "dry", name: tile_name)
    end
    self.shuffle_tiles
  end

  def shuffle_tiles
    positions = (1..24).to_a.shuffle
    self.tiles.each_with_index do |tile, idx|
      tile.position = positions[idx]
    end
  end

end
