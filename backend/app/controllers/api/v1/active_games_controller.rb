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
    end
  end

  def update
    @active_game = ActiveGame.find_by(id: params[:id])
    if @active_game.update(active_game_params)
      @game = @active_game.game
      serialized_active_game = ActiveModelSerializers::Adapter::Json.new(
        ActiveGameSerializer.new(@active_game)
      ).serializable_hash

      ActiveGamesChannel.broadcast_to @game, serialized_active_game
    end
  end

  def destroy
    active_game = ActiveGame.find(params[:id])
    game = active_game.game
    data = {removed_active_game: active_game.id }
    active_game.destroy
    ActiveGamesChannel.broadcast_to(game, data)
    head :ok
  end

  private
    def active_game_params
      params.require(:active_game).permit(:id, :game_id, :user_id, :ready_to_start, :position, :treasure_cards)
    end

end
