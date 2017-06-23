# vue-autocomplete

> An autocomplete component for vuejs 2

## Available functionnalities

- Autocomplete from a list of suggestions
- Keyboard navigation through the list of suggestions
- Event emission on user selection

## Build Setup

``` bash
# install dependencies
npm install

# serve a demo page
npm run dev:docs

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run all tests
npm test
```

## Usage

Register the `<autocomplete/>` component and pass it an `updateSuggestions`
function. The function should return an es6 `Promise` resolving to a list of
suggestions objects. Each suggestion should have a `description` field, which
is displayed to the user.


``` html
<!-- app.vue -->

<template>
  <div id="app">
    <autocomplete :updateSuggestions="updateSuggestions"/>
  </div>
</template>

<script>
  import autocomplete from './Autocomplete'
  const suggestions = [
    {description: 'Paris'
    {description: 'Marseille'},
    {description: 'Lyon'},
    {description: 'Toulouse'},
    {description: 'Nice'},
    {description: 'Nantes'},
    {description: 'Strasbourg'},
    {description: 'Montpellier'},
    {description: 'Bordeaux'},
    {description: 'Lille'},
    {description: 'Rennes'},
    {description: 'Le Havre'},
    {description: 'Reims'},
    {description: 'Saint-Étienne'},
  ]
  export default {
    name: 'app',
    components: {
      autocomplete: autocomplete,
    },
    methods: {
      updateSuggestions: function (userInput) {
        const normalized = userInput.toLowerCase()
        const filtered = suggestions.filter((suggestion) => {
          return suggestion.description.toLowerCase().startsWith(normalized)
        })
        return Promise.resolve(filtered)
      }
    }
  }
</script>
```

The component is provided without styling. Make it look shiny on your website
with your custom styles! For a starter kit, you could use the styles below.


``` html
<!-- MyAutocomplete.vue -->

<script>
  import Vue from 'vue'
  import autocomplete from 'vue_autocomplete'
  export default Vue.extend({
    mixins: [autocomplete],
  })
</script>
<style scoped>
  .vue-autocomplete * {
    box-sizing: border-box;
  }

  .user-input {
    font-size: 1rem;
    text-align: center;
    width: 100%;
    border: none;
    padding: 1em;
    margin: 0;
    background-color: transparent;
  }

  .user-input:focus {
    outline: none;
  }

  .results {
    padding: 0;
    width: 100%;
    background-color: white;
  }

  .results li {
    border-top: solid 1px #aaa;
    padding: 0.8em 1em;
    cursor: pointer;
    font-size: 0.8rem;
  }

  .results ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  .active{
    background-color: #f5f9ff;
  }

  .link {
    text-decoration: none;
    color: inherit;
  }

  .credentials {
    font-size: 0.6em;
    text-align: right;
    cursor: auto;
  }
</style>
```
