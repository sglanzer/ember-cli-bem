import Ember from 'ember'
import podNames from 'ember-cli-bem/pod-names'
import BEM from 'ember-cli-bem/mixins/bem'

const {
  Component,
  ComponentLookup,
  Controller,
  computed,
  getOwner
} = Ember

// ComponentLookup.reopen({
//   componentFor(name, owner) {
//     owner = owner.hasRegistration ? owner : getOwner(this)

//     debugger

//     if (podNames[name] && !owner.hasRegistration(`component:${name}`)) {
//       owner.register(`component:${name}`, Component)
//     }

//     return this._super(...arguments)
//   }
// })

Component.reopen(BEM, {

})

Controller.reopen(BEM, {

})

export function initialize () {}

export default {
  name: 'bem-styles',
  initialize
}
