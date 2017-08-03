function getPair(node, path) {
  return findBy(node.hash.pairs, 'key', path);
}

function findBy(target, key, path) {
  for (var i = 0, l = target.length; i < l; i++) {
    if (target[i][key] === path) {
      return target[i];
    }
  }

  return false;
}

module.exports = class BEMHtmlbarsPlugin {

  constuctor() {
    this.builders = null;
    this.syntax = null;
  }

  transform(ast) {
    if (!this.builders) {
      this.builders = this.syntax.builders;
    }

    this.syntax.traverse(ast, {
      MustacheStatement: this.transformStatement.bind(this),
      BlockStatement: this.transformStatement.bind(this),
      SubExpression: this.transformSubexpression.bind(this)
    });

    return ast;
  }

  transformStatement(node) {
    if (node.path.original === 'element') {
      this.transformLocalClassHelperInvocation(node);
    }
  }

  transformSubexpression(node) {
    if (node.path.original === 'element') {
      this.transformLocalClassHelperInvocation(node);
    }
  }

  // Transform {{element 'foo'}} into {{element 'foo' from=(unbound __styles__)}}
  transformLocalClassHelperInvocation(node) {
    if (getPair(node, 'block')) {
      return;
    }

    node.hash.pairs.push(this.builders.pair('block', this.block()));
    node.hash.pairs.push(this.builders.pair('foo', this.unboundStyles()));
  }

  block() {
    const blockPath = this.builders.path('block');
    const unboundPath = this.builders.path('unbound');
    return this.builders.sexpr(unboundPath, [blockPath]);
  }

  unboundStyles() {
    const stylesPath = this.builders.path('__styles__');
    const unboundPath = this.builders.path('unbound');
    return this.builders.sexpr(unboundPath, [stylesPath]);
  }

}
