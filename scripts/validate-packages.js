const chalk = require('chalk');
const appPackageJsonPath = process.env.INIT_CWD + '/package.json';
const packagesErrors = [];

function getPackageVersion(packageVersionFull, packageName) {
  if (packageVersionFull.startsWith('file')) {
    packageVersionFull = packageVersionFull.replace(`file:${packageName}-`, '').replace('.tgz', '');
  }
  else if (packageVersionFull.startsWith('~') || packageVersionFull.startsWith('^')) {
    packageVersionFull = packageVersionFull.substring(1);
  }

  return packageVersionFull;
}

function validateLocalPackage(packageJson, packageName) {
  const packageVersionFullName = packageJson.dependencies[packageName] || packageJson.devDependencies[packageName];
  const packageVersion = getPackageVersion(packageVersionFullName, packageName);
  let localInstallPackageVersion;
  try { localInstallPackageVersion = require(packageName.concat('/package.json')).version; }
  catch {
    const path = `${process.env.INIT_CWD}/node_modules/${packageName}/package.json`;
    try { localInstallPackageVersion = require(path).version; }
    catch {}
  }

  if (packageVersion !== localInstallPackageVersion) {
    packagesErrors.push({
      packageJsonName: packageJson.name,
      packageName: packageName,
      packageVersion: packageVersion,
      localInstallPackageVersion: localInstallPackageVersion
    });
  }
}

function processResults() {
  if (packagesErrors.length > 0) {
    console.log('\n\n===================================');
    console.log(chalk.white.bgRed.bold('Version validate error(s) detected: \n'));

    packagesErrors.forEach(package => {
      console.log(chalk.cyan(`Invalid package: ${chalk.bgWhite.black(` ${package.packageName} `)}. package.json: ${chalk.green(`${package.packageVersion}`)}, node_modules: ${chalk.red(`${package.localInstallPackageVersion}`)}`));
    });

    console.log(chalk.cyan(`\nTry to ${chalk.bgYellow.black('npm install')} the correct versions for missing/invalid packages`));
    console.log('===================================\n\n\n');

    process.exit(1);
  } else {
    process.exit(0);
  }
}


const packageJson = require(appPackageJsonPath);
const deps = Object.keys({ ...packageJson.dependencies, ...packageJson.devDependencies });  
deps.forEach((dep) => validateLocalPackage(packageJson, dep));

processResults();
