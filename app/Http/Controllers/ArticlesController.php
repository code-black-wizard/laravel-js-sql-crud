<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Articles;

class ArticlesController extends Controller
{
    public function index () {
        
        $articles = Articles::all();

        return $articles;
    }

    public function show ($id) {
        
        $article = Articles::find($id);

        return $article;
    }

    public function store (Request $request) {

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:50',
            'text' => 'required|string|'
        ]);

        if (!$validator->fails()) {
            $newArticle = new Articles;
            $newArticle->title = $request->input('title');
            $newArticle->text = $request->input('text');
            $newArticle->save();
            return response('New article is add')
                    ->header('Content-Type', 'text/plain');
        } else {
            return response('Validation error')
                    ->header('Content-Type', 'text/plain');
        }
    }

    public function destroy (Request $request) {

        $deleteArticle =  Articles::find($request->input('id'));

        if ($deleteArticle->delete()) {
            return response('Article has been deleted')
                    ->header('Content-Type', 'text/plain');
        } else {
            return response('Validation error')
                    ->header('Content-Type', 'text/plain');
        }

    }

    public function update (Request $request) {

        $updateArticle = Articles::find($request->input('id'));

        $updateArticle->text = $request->input('text');

        if ($updateArticle->save()) {
            return response('Article has been updated')
                    ->header('Content-Type', 'text/plain');
        } else {
            return response('Validation error')
                    ->header('Content-Type', 'text/plain');
        }
    }
}
