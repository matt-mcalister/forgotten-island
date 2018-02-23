class ActiveGameSerializer < ActiveModel::Serializer
  attributes :id, :position, :ability, :treasure_cards
  belongs_to :user
  belongs_to :game
  has_many :messages
end
