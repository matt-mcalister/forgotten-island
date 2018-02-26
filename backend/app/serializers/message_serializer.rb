class MessageSerializer < ActiveModel::Serializer
  attributes :id, :text, :created_at
  belongs_to :active_game
  has_one :user, through: :active_game
end
