class ActiveGame < ApplicationRecord
  belongs_to :user
  belongs_to :game
  has_many :messages, dependent: :destroy

  after_create :assign_ability


  def is_users_turn?
    self.id === self.game.current_turn_id
  end

  def can_get_treasure?
    if self.treasure_cards && self.treasure_cards.length > 3
      counter = self.treasure_cards.each_with_object(Hash.new(0)) { |treasure,counter| counter[treasure] += 1 }
      treasure = counter.find {|treasure_card, count| count >= 4}
      if treasure.empty?
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
