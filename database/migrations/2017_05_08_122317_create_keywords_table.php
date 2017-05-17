<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateKeywordsTable extends Migration
{
    public function up()
    {
      Schema::create('keywords', function (Blueprint $table) {
            $table->increments('id');
            $table->string('word');
            $table->integer('theme_id')->unsigned();
            $table->integer('chat_id')->unsigned();
            $table->timestamps();
            
            $table->foreign('theme_id')->references('id')->on('themes')->onDelete('cascade');
            $table->foreign('chat_id')->references('id')->on('themes')->onDelete('cascade');
        }); 
    }

    public function down()
    {
        Schema::drop('keywords');
    }
}
