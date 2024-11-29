const fs = require('fs');
const appPackageJsonPath = process.env.INIT_CWD + '/package.json';

function enforceFixedPackagesVersions(packageJsonPath, isRelativePath) {
  let hasChanges = false;

  const parseDeps = function (deps) {
    for (const key in deps) {
      const version = deps[key].trim();
      if (version.startsWith('~') || version.startsWith('^')) {
        deps[key] = version.substring(1);
        hasChanges = true;
      }
    }
  };

  const packageJson = require(packageJsonPath);

  parseDeps(packageJson.dependencies);
  parseDeps(packageJson.devDependencies);

  if (hasChanges) {
    const writePath = isRelativePath ?__dirname + '/' + packageJsonPath : packageJsonPath;
    fs.writeFileSync(writePath, JSON.stringify(packageJson, null, 2), 'utf-8');
  }
}

enforceFixedPackagesVersions(appPackageJsonPath, false);