class MessageSerializer < ActiveModel::Serializer
  attributes :id, :text, :created_at
  belongs_to :active_game
end
