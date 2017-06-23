import Vue from 'vue'
import Autocomplete from '@/components/Autocomplete'

describe('Autocomplete.vue', () => {
  it('should render without error as a component', (done) => {
    const root = document.createElement('div')
    root.setAttribute('id', 'root')
    document.body.appendChild(root)
    new Vue({
      el: '#root',
      components: {
        autocomplete: Autocomplete,
      },
      render: function (createElement) {
        return createElement('div', [createElement('autocomplete')])
      },
    }).$mount()
    Vue.nextTick(() => {
      expect(document.querySelector('.user-input').placeholder).to.equal('Search anything')
      done()
    })
  })
  it('should take into account a custom placeholder', () => {
    const Constructor = Vue.extend(Autocomplete)
    const placeholder = 'Search anything you want'
    const vm = new Constructor({propsData: {placeholder: placeholder}}).$mount()
    expect(vm.$el.querySelector('.user-input').placeholder)
      .to.equal(placeholder)
  })
  it('should call updateSuggestions on user input', (done) => {
    const Constructor = Vue.extend(Autocomplete)
    const testPromise = Promise.resolve(['i', 'suggest', 'that'])
    const updateSuggestions = sinon.stub().returns(testPromise)
    const vm = new Constructor({propsData: {updateSuggestions: updateSuggestions}}).$mount()
    const input = vm.$el.querySelector('.user-input')
    input.focus()
    input.value = 'i wanna search this'
    input.dispatchEvent(new Event('input'))
    setTimeout(() => {
      expect(vm.suggestions).to.have.ordered.members(['i', 'suggest', 'that'])
      done()
    }, 1000)  // :( wait for testPromise to resolve
  })
})
