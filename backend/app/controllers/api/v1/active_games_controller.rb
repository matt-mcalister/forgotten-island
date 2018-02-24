class Api::V1::ActiveGamesController < ApplicationController

  def create
    @active_game = ActiveGame.find_or_initialize_by(game_id: params[:game_id], user_id: params[:user_id])
    if @active_game.valid?
      @active_game.save
      @game = Game.find(params[:game_id])
      serialized_game = ActiveModelSerializers::Adapter::Json.new(
        ActiveGameSerializer.new(@active_game)
      ).serializable_hash


      ActiveGamesChannel.broadcast_to @game, serialized_game
    end
  end

  private
    def user_params
      params.require(:active_game).permit(:id, :game_id, :user_id)
    end

end
