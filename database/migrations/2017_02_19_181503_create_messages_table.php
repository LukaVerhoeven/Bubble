<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMessagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('messages', function (Blueprint $table) {
          $table->increments('id');
          $table->string('text', 2000);
          $table->integer('force_theme');
          $table->integer('theme_id')->unsigned();
          $table->integer('chat_id')->unsigned();
          $table->integer('user_id')->unsigned();
          $table->timestamps();

          $table->foreign('theme_id')->references('id')->on('themes')->onDelete('cascade');
          $table->foreign('chat_id')->references('id')->on('chats')->onDelete('cascade');
          $table->foreign('user_id')->references('id')->on('users ')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('messages');
    }
}
