# elm.js
ELM adventures in Javascript
```javascript
const program = {
  model: init(),
  update,
  view,
  viewUpdateInteractions: viewUpdateInteractions()
}
run(program)

function init() {
  return {
    counter: 0
  }
}

function update(action, model) {
  return (
    when(action, [
      'Increment',
      'Decrement'
    ])
    .is('Increment', () => {
      return model.set('counter', model.get('counter') + 1)
    })
    .is('Decrement', () => {
      return model.set('counter', model.get('counter') - 1)
    })
    .end(model)
  )
}

function view(model) {
  return `
    <button class="incrementer">+</button>
    <button class="decrementer">-</button>
    <p>${model.get('counter')}</p>
  `
}

function viewUpdateInteractions(model) {
  return {
    '.incrementer': {
      'click': 'Increment'
    },
    '.decrementer': {
      'click': 'Decrement'
    }
  }
}
```
