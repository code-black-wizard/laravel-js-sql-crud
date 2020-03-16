<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="{{ asset('css/global.css') }}" rel="stylesheet">
  <link href="{{ asset('css/app.css') }}" rel="stylesheet">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <title>Laravel</title>
</head>

<body>
  <div class="uk-container main-cont">
    <div class="uk-grid uk-child-width-1-2@m uk-flex-center">
      <div>
        <form class="form">
          <fieldset class="uk-fieldset">
            <div class="uk-margin">
              <input name="title" class="uk-input" type="text" placeholder="Input">
            </div>
            <div class="uk-margin">
              <textarea name="text" class="uk-textarea" rows="5" placeholder="Textarea"></textarea>
            </div>
            <button class="uk-button uk-button-primary">Add article</button>
          </fieldset>
        </form>
      </div>
    </div>
    <div class="uk-grid uk-child-width-1-3@m wrapper">
    </div>
  </div>

  <script src="{{ asset('js/articles.js') }}"></script>
</body>

</html>