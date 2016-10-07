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

function update(msg, model) {
  return when(msg)
    .is('Increment', () => {
      model.counter += 1
      return model
    })
    .is('Decrement', () => {
      model.counter -= 1
      return model
    })
  .end()
}

function view(model) {
  return `
    <button class="incrementer">+</button>
    <button class="decrementer">-</button>
    <p>${model.counter}</p>
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
