<template>
  <div class="vue-autocomplete">
    <input type="search" ref="input" v-model="userInput" :placeholder="placeholder" class="user-input"
     @focusin="toggleFocus" @focusout="toggleFocus"
     @focus="toggleFocus" @blur="toggleFocus"
     @keydown.enter="select"
     @keydown.down.prevent="down"
     @keydown.up.prevent="up"
     @input="change"
     />
    <div v-show="open" class="results">
      <ul>
        <li v-for="(suggestion, index) in suggestions" :class="{'active': isActive(index)}" @click="select(index)" @mouseover="current=index">
          <a href="#" class="link" v-html="suggestion.description"></a>
        </li>
        <li v-if="credentials" class="credentials">{{ credentials }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
export default {
  props: {
    placeholder: {
      type: String,
      default: function () {
        return 'Search anything'
      },
    },
    credentials: {
      type: String,
      default: function () {
        return ''
      },
    },
    updateSuggestions: {
      type: Function,
      default: function (userInput) {
        // should return a list of suggestion object
        // the only requirement is that suggestion must
        // have a description field
        return Promise.resolve()
      },
    },
  },
  data: function () {
    return {
      currentChoice: 0,
      focus: false,
      userInput: '',
      suggestions: [],
    }
  },
  computed: {
    open: function () {
      return this.suggestions.length > 0 && this.focus
    },
  },
  created: function () {
    this.change = debounce(this.change, 300)
    this.toggleFocus = debounce(this.toggleFocus, 50)  // let other events (click on result) fire before
  },
  methods: {
    up: function () {
      if (this.open) {
        this.currentChoice = (this.suggestions.length + this.currentChoice - 1) % this.suggestions.length
      }
    },
    down: function () {
      if (this.open) {
        this.currentChoice = (this.currentChoice + 1) % this.suggestions.length
      }
    },
    isActive: function (index) {
      return index === this.currentChoice
    },
    toggleFocus: function () {
      this.focus = (document.activeElement === this.$refs.input)
      this.$emit('focus', this.focus)
    },
    change: function () {
      const suggestionPromise = this.updateSuggestions(this.userInput)
      if (suggestionPromise == null || suggestionPromise.then == null) {
        throw new Error('updateSuggestions shall return a Promise object')
      }
      this.updateSuggestions(this.userInput).then((suggestions) => {
        this.suggestions = suggestions.splice(0) || []
        this.currentChoice = 0
      })
    },
    select: function (index) {
      index = parseInt(index) || this.currentChoice
      const selection = this.suggestions[index]
      if (selection == null) {
        return
      }
      this.userInput = selection.description
      this.$emit('select', selection)
      this.suggestions = []
    },
  },
}
</script>
