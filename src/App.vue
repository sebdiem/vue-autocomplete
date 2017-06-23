<template>
  <div id="app">
    <autocomplete :updateSuggestions="updateSuggestions" placeholder="Search for a city"/>
  </div>
</template>

<script>
  import Autocomplete from './components/Autocomplete'
  const suggestions = [
    {description: 'Versailles'},
    {description: 'Vincennes'},
    {description: 'Vilaines'},
    {description: 'Paris'},
    {description: 'Nantes'},
    {description: 'Nanger'},
    {description: 'Bordeaux'},
    {description: 'Marseille'},
    {description: 'Lyon'},
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
