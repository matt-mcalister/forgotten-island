class Api::V1::ActiveGamesController < ApplicationController

  def create
    @active_game = ActiveGame.find_or_initialize_by(game_id: params[:game_id], user_id: params[:user_id])
    if @active_game.valid?
      @active_game.save
      @game = Game.find(params[:game_id])
      serialized_active_game = ActiveModelSerializers::Adapter::Json.new(
        ActiveGameSerializer.new(@active_game)
      ).serializable_hash

      ActiveGamesChannel.broadcast_to @game, serialized_active_game
      head :ok

    end
  end

  def update
    active_game = ActiveGame.find_by(id: params[:id])
    if active_game.update(active_game_params)

      game = active_game.game

      if active_game.is_users_turn? && active_game.actions_remaining == 0
        game.next_users_turn
        active_game = ActiveGame.find_by(id: params[:id])
        game = active_game.game
        
        serialized_game = ActiveModelSerializers::Adapter::Json.new(
          GameSerializer.new(game)
        ).serializable_hash

        serialized_active_games = game.active_games.map do |ag|
          ActiveModelSerializers::Adapter::Json.new(
            ActiveGameSerializer.new(ag)
            ).serializable_hash
        end

        serialized_tiles = game.tiles.map do |tile|
          ActiveModelSerializers::Adapter::Json.new(
            TileSerializer.new(tile)
            ).serializable_hash
        end

        ActiveGamesChannel.broadcast_to game, {new_turn: {game: serialized_game, active_games: serialized_active_games, tiles: serialized_tiles}}
        head :ok


      else
        # send update about just this active_game

        serialized_active_game = ActiveModelSerializers::Adapter::Json.new(
          ActiveGameSerializer.new(active_game)
        ).serializable_hash

        ActiveGamesChannel.broadcast_to game, serialized_active_game
        head :ok
      end
    end
  end

  def destroy
    active_game = ActiveGame.find(params[:id])
    game = active_game.game

    serialized_active_game = ActiveModelSerializers::Adapter::Json.new(
      ActiveGameSerializer.new(active_game)
    ).serializable_hash
    data = {removed_active_game: serialized_active_game[:active_game] }
    active_game.destroy
    ActiveGamesChannel.broadcast_to(game, data)
    head :ok
  end

  private
    def active_game_params
      params.require(:active_game).permit(:id, :game_id, :user_id, :ready_to_start, :position, :treasure_cards, :actions_remaining)
    end

end
