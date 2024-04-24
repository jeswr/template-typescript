#!/usr/bin/env zx

import * as fs from 'fs';

const repo = (await $`git config --get remote.origin.url`).stdout.trim().replace('.git', '');

const pk = JSON.parse(fs.readFileSync('package.json', 'utf8'));

pk.name = '@' + repo.split('/').slice(-2).join('/');
pk.repository.url = repo;
pk.bugs.url = repo + '/issues';

fs.writeFileSync('package.json', JSON.stringify(pk, null, 2));

// console.log(pk.name, pk.version);
// console.log(repo, issues, pkg);


// await $`dep deploy --branch=${branch}`

// await Promise.all([
//   $`sleep 1; echo 1`,
//   $`sleep 2; echo 2`,
//   $`sleep 3; echo 3`,
// ])

// let name = 'foo bar'
// await $`mkdir /tmp/${name}`
