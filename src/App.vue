<template>
  <div id="app">
    <autocomplete :updateSuggestions="updateSuggestions" placeholder="Search for a city"/>
  </div>
</template>

<script>
  import Autocomplete from './components/Autocomplete'
  const suggestions = [
    {description: 'Paris'},
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
      autocomplete: Autocomplete,
    },
    methods: {
      updateSuggestions: function (userInput) {
        const normalized = userInput.toLowerCase()
        let filtered = []
        if (userInput) {
          filtered = suggestions.filter((suggestion) => {
            return suggestion.description.toLowerCase().startsWith(normalized)
          })
        }
        return Promise.resolve(filtered)
      },
    },
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 70%;
  margin-right: auto;
  margin-left: auto;
}
</style>
