import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { withChai } from 'ember-cli-chai/qunit';

moduleForComponent('helper:element', 'Integration | Helper | element', {
  integration: true
});

test('it should get block by default', withChai(function(expect, assert) {
  assert.expect(1);

  this.set('block', 'foo');
  this.render(hbs`{{element 'bar'}}`);

  expect(this.$().text().trim()).to.be.equal('foo__bar');
}));

test('it should use specified block', withChai(function(expect, assert) {
  assert.expect(1);

  this.render(hbs`{{element '123' block='abc'}}`);

  expect(this.$().text().trim()).to.be.equal('abc__123');
}));

test('it should generate mods class names', withChai(function(expect, assert) {
  assert.expect(1);

  this.set('block', 'foo');
  this.render(hbs`{{element 'bar' hidden=true type='primary' disabled=false}}`);

  const classNames = this.$().text().trim().split(' ').sort();
  expect(classNames).to.be.deep.equal([
    'foo__bar',
    'foo__bar_hidden',
    'foo__bar_type_primary',
  ]);
}));
