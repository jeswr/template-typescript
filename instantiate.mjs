#!/usr/bin/env zx

import * as fs from 'fs';

const repo = (await $`git config --get remote.origin.url`).stdout.trim().replace('.git', '');

const pk = JSON.parse(fs.readFileSync('package.json', 'utf8'));

pk.name = '@' + repo.split('/').slice(-2).join('/');
pk.repository.url = repo;
pk.bugs.url = repo + '/issues';
pk.homepage = repo + '/README.md';

fs.writeFileSync('package.json', JSON.stringify(pk, null, 2) + '\n');

for (const file of ['LICENSE', 'README.md']) {
  fs.writeFileSync(file, fs.readFileSync(file, 'utf8').replace(/2021/g, new Date().getFullYear().toString()));
}

await $`npx npm-check-updates -u -t minor`;
