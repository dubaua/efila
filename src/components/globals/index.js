import Vue from 'vue';
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';

const STARTS_WITH_DOT_SLASH_REGEXP = /^\.\//;
const INDEX_DOT_ANYTHING_REGEXP = /(\/index)?\.\w+$/;

// Require in a base component context, include subdirectories = true
const requireComponent = require.context('.', true, /\.(vue|js)$/);

requireComponent.keys().forEach((fileName) => {
  // Don't register this file
  if (fileName === './index.js') return;

  // Get component config
  const componentConfig = requireComponent(fileName);

  // Get PascalCase name of component
  const componentName = upperFirst(
    camelCase(
      fileName
        .replace(STARTS_WITH_DOT_SLASH_REGEXP, '')
        .replace(INDEX_DOT_ANYTHING_REGEXP, ''),
    ),
  );

  // Register component globally
  Vue.component(componentName, componentConfig.default || componentConfig);
});
