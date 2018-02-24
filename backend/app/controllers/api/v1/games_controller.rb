class Api::V1::GamesController < ApplicationController

  def index
    games = Game.all
    render json: games
  end

  def show
    game = Game.find(params[:id])
    active_games = game.active_games

    serialized_game = ActiveModelSerializers::Adapter::Json.new(
      GameSerializer.new(game)
    ).serializable_hash
    serialized_active_games = active_games.map do |ag|
      ActiveModelSerializers::Adapter::Json.new(
        ActiveGameSerializer.new(ag)
        ).serializable_hash
    end

    render json: {game: serialized_game, active_games: serialized_active_games}

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
