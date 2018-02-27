class ActiveGame < ApplicationRecord
  belongs_to :user
  belongs_to :game
  has_many :messages, dependent: :destroy

  after_create :assign_ability

  def move_up
    case self.position
    when 23..24
      self.position = self.position - 3
    when 19..22
      self.position = self.position - 5
    when 13..18
      self.position = self.position - 6
    when 8..11
      self.position = self.position - 5
    when 4..5
      self.position = self.position - 3
    else
      self.position = 0 
    end
    self.successful_move?(self.position)
  end

  def move_left
  end

  def move_right
  end

  def move_down
  end

  def successful_move?(position)
    if (1..24).to_a.include?(position)
      self.save
      "success"
    else
      "invalid move"
    end
  end

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
