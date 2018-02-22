class TileSerializer < ActiveModel::Serializer
  attributes :id, :name, :status, :position
  belongs_to :game
end
