import Ember from 'ember';
import { elem, mod } from 'ember-cli-bem/mixins/bem';

const {
  Helper: { helper }
} = Ember;

const BLOCK_KEY = 'block';

export default helper(function(params, hash) {
  const block = hash[BLOCK_KEY];
  const [ elemName ] = params;

  const scopedStyles = hash['scopedStyles']
  const scopedBlock = scopedStyles[block]
  const scopedHashString = scopedBlock.slice(scopedBlock.lastIndexOf('_') + 1)

  if (!block) {
    throw Error(`${BLOCK_KEY} is required for 'elem' helper`);
  }

  const elemClassName = elem(block, elemName, scopedHashString);

  const modNames = Object.keys(hash).filter((key) => key !== BLOCK_KEY);
  const modClassNames = modNames.map((modName) => {
    const modValue = hash[modName];
    return mod(elemClassName, { modName, modValue }, scopedHashString);
  });

  return [elemClassName, ...modClassNames].filter(Boolean).join(' ');
});
