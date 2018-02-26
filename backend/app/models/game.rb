class Game < ApplicationRecord
  has_many :active_games
  has_many :users, through: :active_games
  has_many :messages, through: :active_games
  has_many :tiles, dependent: :destroy

  after_create :generate_flood_cards

  def initiate_game_session
    self.active_games.each do |ag|
      self.assign_treasure_cards(ag)
    end
    self.draw_flood_cards
    self.current_turn_id = self.active_games.first.id
    self.save
  end

  def waters_rise(card)
    self.water_level = self.water_level + 1
    self.treasure_discards << card
    self.flood_discards = self.flood_discards.shuffle
    self.flood_cards = [self.flood_cards, self.flood_discards].flatten
    self.save
  end

  def assign_treasure_cards(active_game)
    cards = self.treasure_cards.pop(2)
    self.save
    cards.each do |card|
      if card != "Waters Rise" || (!self.current_turn_id && card != "Waters Rise")
        active_game.treasure_cards ||= []
        active_game.treasure_cards << card
        active_game.save
      else
        self.waters_rise(card)
      end
    end
  end

  def water_level_cards
    case self.water_level
    when 1..2
      return 2
    when 3..5
      return 3
    when 6..7
      return 4
    when 8..9
      return 5
    else
      return 10
    end
  end


  def draw_flood_cards # draws flood cards and places in flood discard pile. returns drawn cards.
    cards = self.flood_cards.pop(self.water_level_cards)
    cards.each do |card|
      tile = Tile.where(game_id: self.id, name: card).first
      if tile.status == "dry"
        tile.update(status: "wet")
        self.flood_discards << card
      elsif tile.status == "wet"
        tile.update(status: "sunk")
      end
    end
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
      "Fools Landing",
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
      "The Ocean Chalice",
      "The Ocean Chalice",
      "The Ocean Chalice",
      "The Ocean Chalice",
      "The Ocean Chalice",
      "Sandbag",
      "Sandbag",
      "Helicopter Lift",
      "Helicopter Lift",
      "Helicopter Lift",
      "Waters Rise",
      "Waters Rise",
      "Waters Rise"
    ].shuffle
    self.treasure_discards = []
    if self.valid?
      self.save
    else
      byebug
    end
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
      if tile.update(position: positions[idx])
        tile.save
      else
        byebug
      end
    end
  end

end
