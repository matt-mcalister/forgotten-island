class ActiveGameSerializer < ActiveModel::Serializer
  attributes :id, :position, :ability, :treasure_cards
  belongs_to :user
  belogns_to :game
end
