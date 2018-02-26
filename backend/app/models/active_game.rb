class ActiveGame < ApplicationRecord
  belongs_to :user
  belongs_to :game
  has_many :messages, dependent: :destroy

  after_create :assign_ability

  def is_users_turn?
    self.id === self.game.current_turn_id
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
