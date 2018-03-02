class ActiveGame < ApplicationRecord
  belongs_to :user
  belongs_to :game
  has_many :messages, dependent: :destroy

  after_create :assign_ability

  def sandbag(tile)
    tile.update(status: "dry")
    self.discard("Sandbag")
  end

  def helicopter_lift(active_games, destination_tile_position)
    active_games.each do |ag|
      ActiveGame.find(ag["id"]).update(position: destination_tile_position)
    end
    self.discard("Helicopter Lift")
  end

  def must_discard?
    self.treasure_cards ||= []
    self.treasure_cards.length > 5
  end

  def discard(card)
    self.treasure_cards.delete_at(self.treasure_cards.index(card))
    self.update(treasure_cards: self.treasure_cards)
    self.game.treasure_discards ||= []
    self.game.treasure_discards << card
    self.game.save
  end


  def trade_treasure_cards(treasure)
    newTreasureCards = self.treasure_cards.reject {|treasure_card| treasure_card == treasure}
    self.update(treasure_cards: newTreasureCards)

    arr = self.game.treasures_obtained || []
    arr << treasure
    self.game.update(treasures_obtained: arr)

    tiles = Tile.where(game_id: self.game.id, treasure: treasure)

    tiles.each do |tile|
      tile.update(treasure: nil)
    end
  end

  def give_treasure_card(treasure_card, active_game_id)
    self.treasure_cards.delete_at(self.treasure_cards.index(treasure_card))
    self.update(treasure_cards: self.treasure_cards)
    active_game = ActiveGame.find(active_game_id)
    new_treasure_cards = [active_game.treasure_cards, treasure_card].flatten
    active_game.update(treasure_cards: new_treasure_cards )
  end

  def can_trade_cards_with_user?
    self.game.active_games.any? {|ag| ag.id != self.id && ag.position == self.position}
  end

  def is_users_turn?
    self.id === self.game.current_turn_id
  end

  def can_get_treasure?
    if self.treasure_cards && self.treasure_cards.length > 3
      counter = self.treasure_cards.each_with_object(Hash.new(0)) { |treasure,counter| counter[treasure] += 1 }
      treasure = counter.find {|treasure_card, count| count >= 4}
      if !treasure
        false
      else
        treasure.first
      end
    else
      false
    end
  end

  def assign_ability
    abilities = [
      "Pilot",
      "Navigator",
      "Explorer",
      "Diver",
      "Engineer",
      "Messenger"
    ].select {|ability_name| !self.game.active_games.map {|active_game| active_game.ability}.include?(ability_name) }
    self.ability = abilities.sample
    self.save
    self.assign_position
  end

  def assign_position
    positions = {
      "Pilot": "Fools' Landing",
      "Diver": "Iron Gate",
      "Explorer": "Copper Gate",
      "Engineer": "Cobalt Gate",
      "Messenger": "Silver Gate",
      "Navigator": "Gold Gate"
    }
    self.position = self.game.tiles.find {|tile| tile.name == positions[self.ability.to_sym]}.position
    self.save
  end
end
