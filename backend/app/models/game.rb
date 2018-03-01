class Game < ApplicationRecord
  has_many :active_games
  has_many :users, through: :active_games
  has_many :messages, through: :active_games
  has_many :tiles, dependent: :destroy

  after_create :generate_flood_cards

  def game_over
    if Tile.where(name: "Fools Landing", game_id: self.id).empty? || self.any_treasure_unobtainable?
      return "GAME OVER"
    elsif self.victory?
      return "VICTORY"
    else
      return false
    end
  end

  def any_treasure_unobtainable?
    ["The Earth Stone","The Statue of the Wind","The Crystal of Fire","The Ocean Chalice"].any? do |treasure|
      Tile.where(game_id: self.id, treasure: treasure, status: "abyss").count == 2
    end
  end

  def victory?
    self.treasures_obtained ||= []
    self.treasures_obtained.length == 4 &&
      self.active_games.all? {|ag| ag.position == Tile.where(name: "Fools Landing", game_id: self.id).position} &&
        self.active_games.any? {|ag| ag.treasure_cards.include?("Helicopter Lift")}
  end

  def halt_game_for_discard?
    self.active_games.any? {|ag| ag.must_discard? }
  end

  def turn_order
    self.active_games.sort_by {|ag| ag.id}
  end

  def initiate_game_session
    result = {}
    self.active_games.each do |ag|
      self.assign_treasure_cards(ag)
    end
    flood_card_results = self.draw_flood_cards
    self.current_turn_id = self.active_games.first.id
    self.active_games.first.update(actions_remaining: 3)
    self.save
  end

  def waters_rise(card)
    self.water_level = self.water_level + 1
    self.treasure_discards << card
    self.flood_discards = self.flood_discards.shuffle
    self.flood_cards = [self.flood_cards, self.flood_discards].flatten
    self.save
  end

  def draw_treasure_card
    if self.treasure_cards.length == 0
      self.treasure_cards = self.treasure_discards
      self.treasure_discards = []
      self.save
    end
    treasure_cards = self.treasure_cards.shuffle
    treasure_cards.pop
  end

  def assign_treasure_cards(active_game)
    2.times do
      card = self.draw_treasure_card
      puts "-----------------------#{card}-----------------------"
      if !self.current_turn_id
        while card == "Waters Rise"
          self.treasure_cards.shuffle
          card = self.draw_treasure_card
        end
      end
      if card != "Waters Rise"
        active_game.treasure_cards ||= []
        active_game.treasure_cards << card
        active_game.save
      else
        puts "-----------------WATERS RISE----------------"
        self.waters_rise(card)
      end
      self.save
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
    result = {}
    cards = self.flood_cards.pop(self.water_level_cards)
    cards.each do |card|
      tile = Tile.where(game_id: self.id, name: card).first
      if tile.status == "dry"
        tile.update(status: "wet")
        self.flood_discards << card
        result[card] = "wet"
      elsif tile.status == "wet"
        puts "-----------------A TILE HAS SUNKEN INTO THE ABYSS-------------------"
        tile.update(status: "abyss")
        result[card] = "abyss"
      end
    end
    self.save
    result
  end

  def next_users_turn
    self.assign_treasure_cards(ActiveGame.find(self.current_turn_id))

    self.draw_flood_cards

    current_turn_index = self.turn_order.map {|ag| ag.id}.index(self.current_turn_id)

    if current_turn_index == self.active_games.length - 1
      current_turn_index = -1
    end
    self.current_turn_id = self.turn_order[current_turn_index+1].id
    self.save

    ActiveGame.find(self.current_turn_id).update(actions_remaining: 3)
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
    self.save
    self.generate_tiles
  end

  def generate_tiles
    self.flood_cards.each do |tile_name|
      case tile_name
      when "Cave of Embers", "Cave of Shadows"
        Tile.create(game: self, status: "dry", name: tile_name, treasure: "The Crystal of Fire")
      when "Coral Palace", "Tidal Palace"
        Tile.create(game: self, status: "dry", name: tile_name, treasure: "The Ocean Chalice")
      when "Whispering Garden", "Howling Garden"
        Tile.create(game: self, status: "dry", name: tile_name, treasure: "The Statue of the Wind")
      when "Temple of the Sun", "Temple of the Moon"
        Tile.create(game: self, status: "dry", name: tile_name, treasure: "The Earth Stone")
      else
        Tile.create(game: self, status: "dry", name: tile_name)
      end


    end
    self.shuffle_tiles
  end

  def shuffle_tiles
    positions = (1..24).to_a.shuffle
    self.tiles.each_with_index do |tile, idx|
      tile.update(position: positions[idx])
    end
  end

end
