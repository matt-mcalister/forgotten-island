class ActiveGameSerializer < ActiveModel::Serializer
  attributes :id, :position, :ability, :treasure_cards, :ready_to_start, :is_users_turn?, :actions_remaining, :can_get_treasure?
  belongs_to :user
  belongs_to :game
  has_many :messages
end
