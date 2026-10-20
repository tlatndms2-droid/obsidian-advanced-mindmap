import {spawnSync} from 'node:child_process';
const files=['test-layout.mjs','test-connection-shortcuts.mjs','test-creation-transaction.mjs','test-navigation.mjs','test-arrange.mjs','test-media-picker.mjs','test-settings-backup.mjs','test-stage6.mjs'];
for(const file of files){console.log('\n'+file);const r=spawnSync(process.execPath,['scripts/'+file],{stdio:'inherit'});if(r.error)throw r.error;if(r.status!==0)process.exit(r.status??1);}console.log('\nPASS all 8 code suites. Actual Obsidian UI is not tested.');
