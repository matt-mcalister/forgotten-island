class Api::V1::GamesController < ApplicationController

  def index
    games = Game.all
    render json: games
  end

  def create
    game = Game.new(game_params)

    if game.valid?
      game.save

      serialized_game = ActiveModelSerializers::Adapter::Json.new(
        GameSerializer.new(game)
      ).serializable_hash

      ActionCable.server.broadcast 'games_channel', serialized_game
      head :ok
    end
  end

  private
    def game_params
      params.require(:game).permit(:id, :name, :water_level)
    end

end
