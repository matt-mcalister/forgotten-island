class ActiveGame < ApplicationRecord
  belongs_to :user
  belongs_to :game
  has_many :messages

  after_create :assign_ability

  def assign_ability
    abilities = [
      "Pilot",
      "Navigator",
      "Explorer",
      "Diver",
      "Engineer",
      "Messenger"
    ].select {|ability_name| self.game.users.map {|user| user.ability}.include?(ability_name) }

    self.ability = abilities.sample
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

    self.position = self.game.tiles.first {|tile| tile.name === positions[self.ability]}.position
  end
end
