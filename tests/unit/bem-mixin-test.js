/* eslint-disable no-unused-expressions */

import Ember from 'ember';
import { module, test } from 'qunit';
import { withChai } from 'ember-cli-chai/qunit';

import BEM from 'ember-cli-bem/mixins/bem';

const {
  get,
  Object,
  run,
  set,
} = Ember;

module('Unit | Mixin | BEM');

test('should correctly calculate blockClassName with block', withChai(function(expect, assert) {
  assert.expect(1);

  const block = Object.extend(BEM, {
    block: 'checkbox',
  }).create();

  const blockClassName = get(block, 'blockClassName');
  expect(blockClassName).to.be.equal('checkbox');
}));

test('should correctly calculate blockClassName with block and elemName', withChai(function(expect, assert) {
  assert.expect(1);

  const block = Object.extend(BEM, {
    block: 'checkbox',
    elemName: 'label',
  }).create();

  const blockClassName = get(block, 'blockClassName');
  expect(blockClassName).to.be.equal('checkbox__label');
}));

test('should calculate mod with string value', withChai(function(expect, assert) {
  assert.expect(1);

  const redButton = Object.extend(BEM, {
    block: 'button',
    mods: [
      'color',
    ],
    color: 'red',
  }).create();

  const modsClassNames = get(redButton, 'modsClassNames');
  expect(modsClassNames).to.be.equal('button_color_red');
}));

test('should calculate mod with boolean value', withChai(function(expect, assert) {
  assert.expect(1);

  const disabledButton = Object.extend(BEM, {
    block: 'button',
    mods: [
      'disabled',
    ],
    disabled: true,
  }).create();

  const modsClassNames = get(disabledButton, 'modsClassNames');
  expect(modsClassNames).to.be.equal('button_disabled');
}));

test('should calculate mod with custom value key', withChai(function(expect, assert) {
  assert.expect(1);

  const selectModeButton = Object.extend(BEM, {
    block: 'button',
    mods: [
      'selectMode:select-mode',
    ],
    selectMode: true,
  }).create();

  const modsClassNames = get(selectModeButton, 'modsClassNames');
  expect(modsClassNames).to.be.equal('button_select-mode');
}));

test('should hide mod with false boolean value', withChai(function(expect, assert) {
  assert.expect(1);

  const hiddenButton = Object.extend(BEM, {
    block: 'button',
    mods: [
      'hidden',
    ],
    hidden: false,
  }).create();

  const modsClassNames = get(hiddenButton, 'modsClassNames');
  expect(modsClassNames).to.be.equal('');
}));

test('should use negative mod name if it exists and value if false', withChai(function(expect, assert) {
  assert.expect(1);

  const negativeStateButton = Object.extend(BEM, {
    block: 'button',
    mods: [
      'pressed:pressed:non-pressed',
    ],
    pressed: false,
  }).create();

  const modsClassNames = get(negativeStateButton, 'modsClassNames');
  expect(modsClassNames).to.be.equal('button_non-pressed');
}));

test('should calculate multiple mods', withChai(function(expect, assert) {
  assert.expect(1);

  const complexButton = Object.extend(BEM, {
    block: 'button',
    mods: [
      'disabled',
      'color',
    ],
    disabled: true,
    color: 'black',
  }).create();

  const modsClassNames = get(complexButton, 'modsClassNames');
  expect(modsClassNames).to.be.equal('button_disabled button_color_black');
}));

test('should recalculate modsClassNames when dependent property has changed', withChai(function(expect, assert) {
  assert.expect(2);

  const button = Object.extend(BEM, {
    block: 'button',
    mods: [
      'color',
    ],
    color: 'red',
  }).create();

  expect(get(button, 'modsClassNames')).to.be.equal('button_color_red');

  run(() => {
    set(button, 'color', 'black');
  });

  expect(
    get(button, 'modsClassNames'),
    'should recalculate mod when dependent key has changed'
  ).to.be.equal('button_color_black');
}));
