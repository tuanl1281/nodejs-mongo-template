import fs from 'fs';
import path from 'path';

const getAliases = (aliases = {}) => {
  const base = process.cwd();
  const prefix = process.platform === 'win32' ? 'file://' : '';
  return Object.keys(aliases).reduce(
    (_, __) => (aliases[__][0] === '/' ? _ : { ..._, [__]: path.join(prefix, base, aliases[__]) }),
    aliases
  );
};

const isAliasInSpecifier = (path, alias) => {
  return path.indexOf(alias) === 0 && (path.length === alias.length || path[alias.length] === '/');
};

const configuration = JSON.parse(fs.readFileSync(path.resolve('aliases.config.json'), 'utf8'));
const aliases = getAliases(configuration ?? {});
export const resolve = (specifier, parentModuleURL, defaultResolve) => {
  const alias = Object.keys(aliases).find((key) => isAliasInSpecifier(specifier, key));
  const newSpecifier = alias === undefined ? specifier : path.join(aliases[alias], specifier.substr(alias.length));

  return defaultResolve(newSpecifier, parentModuleURL);
};
