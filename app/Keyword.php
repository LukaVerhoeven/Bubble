<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Keyword extends Model
{	
    protected $fillable = [
        'word', 'theme_id', 'chat_id','created_at','updated_at'
    ];
  
	public static function keywordStringToArray($keywordString)
	{
        $keywords = preg_replace('/\s+/', ',', $keywordString);
        $keywords = explode( ',', $keywords );
        return $keywords;
	}

    public static function filterKeywords($keywordString)
    {
        $keywords = Keyword::keywordStringToArray($keywordString);
        $keywords = array_filter($keywords); //remove empty elements
        $keywords = array_unique($keywords); //remove duplicates
        return $keywords;
    }

	public static function createKeywords($keywords, $themeid, $chatid)
	{	
		$data = array();
        foreach ($keywords as $word) {
            $newKeyword = array(
                'word'=> strtolower($word), 
                'theme_id'=> $themeid, 
                'chat_id'=> $chatid, 
                'created_at'=> date('Y-m-d H:i:s'), 
                'updated_at'=> date('Y-m-d H:i:s')
            );
            array_push($data, $newKeyword);
        }
        // dd($data);
        Keyword::insert($data);
	}
}
