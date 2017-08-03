import Ember from 'ember';

const {
  computed,
  defineProperty,
  get,
  Mixin,
  set,
} = Ember;

export function elem(block, elemName, scopedHashString) {
  if (scopedHashString) {
    return `_${block}__${elemName}_${scopedHashString}`;
  }
  return `${block}__${elemName}`;
}

export function mod(block, modDefinition, scopedHashString) {
  const { modName, negativeModName, modValue } = modDefinition;
  const hasNegativeModName = typeof negativeModName !== 'undefined';

  if (typeof modValue === 'boolean') {
    if (hasNegativeModName && !modValue) {
      return `_${block}--${negativeModName}_${scopedHashString}`;
    } else if (modValue) {
      return `_${block}--${modName}_${scopedHashString}`;
    }
  } else if (modValue) {
    return `_${block}--${modName}-${modValue}_${scopedHashString}`;
  }
}

export default Mixin.create({

  classNameBindings: [
    'blockClassName',
    'modsClassNames',
  ],
  concatenatedProperties: ['mods'],

  block: null,
  elemName: null,
  mods: null,

  init() {
    this._super(...arguments);

    if (!get(this, 'mods')) {
      set(this, 'mods', []);
    }

    const mods = get(this, 'mods');
    const modsDependencies = mods.map((mod) => this._getModValueKey(mod));

    defineProperty(
      this,
      'modsClassNames',
      computed('blockClassName', ...modsDependencies, this._getModsClassNames)
    );
  },

  blockClassName: computed('block', 'elemName', '__styles__', function() {
    const block = get(this, 'block');
    const elemName = get(this, 'elemName');
    const scopedStyles = get(this, '__styles__');
    const scopedBlock = scopedStyles[block]
    const scopedHashString = scopedBlock.slice(scopedBlock.lastIndexOf('_') + 1)

    if (block && elemName) {
      return elem(block, elemName, scopedHashString);
    } else if (block) {
      return `_${block}_${scopedHashString}`;
    }
  }),

  _getModName(modDefinition) {
    const [modName, modValueProperty] = modDefinition.split(':');
    return modValueProperty || modName;
  },

  _getModValueKey(modDefinition) {
    const [modName] = modDefinition.split(':');
    return modName;
  },

  _getNegativeModName(modDefinition) {
    const [,, negativeModValueProperty] = modDefinition.split(':');
    return negativeModValueProperty;
  },

  _getModsClassNames() {
    const blockClassName = get(this, 'blockClassName');
    const mods = get(this, 'mods');

    const modsClassNames = mods.map((modDefinition) => {
      const modName = this._getModName(modDefinition);
      const negativeModName = this._getNegativeModName(modDefinition);
      const modValueProperty = this._getModValueKey(modDefinition);
      const modValue = get(this, modValueProperty);

      return mod(blockClassName, {
        modName,
        negativeModName,
        modValue
      });
    });

    return modsClassNames.join(' ');
  },

});
