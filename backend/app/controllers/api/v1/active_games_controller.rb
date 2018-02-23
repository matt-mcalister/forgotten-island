class Api::V1::ActiveGamesController < ApplicationController

  def create
    @active_game = ActiveGame.find_or_initialize_by(game_id: params[:game_id], user_id: params[:user_id])
    puts "successful post"
    # byebug
    if @active_game.valid?
      puts "post valid"
      @active_game.save
      puts "active_game saved"
      @game = Game.find(params[:game_id])
      puts "game found"
      serialized_game = ActiveModelSerializers::Adapter::Json.new(
        ActiveGameSerializer.new(@active_game)
      ).serializable_hash

      puts serialized_game

      ActiveGamesChannel.broadcast_to @game, serialized_game
    end
  end

  private
    def user_params
      params.require(:active_game).permit(:id, :game_id, :user_id)
    end

end
