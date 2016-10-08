const program = {
  model: init(),
  update,
  view,
  viewUpdateTriggers: viewUpdateTriggers()
}
run(program)

function init() {
  return {
    counter: 0
  }
}

function update(action, model) {
  return (
    when(action)
      .is('Increment', () => {
        return model.set('counter', model.get('counter') + 1)
      })
      .is('Decrement', () => {
        return model.set('counter', model.get('counter') - 1)
      })
    .end()
  )
}

function view(model) {
  return `
    <button class="incrementer">+</button>
    <button class="decrementer">-</button>
    <p>${model.get('counter')}</p>
  `
}

function viewUpdateTriggers(model) {
  return {
    '.incrementer': {
      'click': 'Increment'
    },
    '.decrementer': {
      'click': 'Decrement'
    }
  }
}
