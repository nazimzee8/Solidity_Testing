const Web3 = require('web3');
const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');

const buildPath = path.resolve('../', 'build');
const contractsFolderPath = path.resolve('../', 'main_contracts');

const createBuildFolder = () => {
    fs.emptyDirSync(buildPath);
}

const buildSources = () => {
    const sources = {};
    const contractsFiles = fs.readdirSync(contractsFolderPath);

    contractsFiles.forEach(file => {
        const contractFullPath = path.resolve(contractsFolderPath, file);
        sources[file] = {
            content: fs.readFileSync(contractFullPath, 'utf8')
        };
		console.log(file);
    });
	//console.log(sources);
    
    return sources;
}

const input = {
	language: 'Solidity',
	sources: buildSources(),
	settings: {
		outputSelection: {
			'*': {
				'*': [ '*' ]
			}
		}
	}
}

const compileContracts = () => {
	const compiledContracts = JSON.parse(solc.compile(JSON.stringify(input))).contracts;
	//console.log(solc.compile(JSON.stringify(input)));
	for (let contract in compiledContracts) {
		for(let contractName in compiledContracts[contract]) {
			fs.outputJsonSync(
				path.resolve(buildPath, `${contractName}.json`),
				compiledContracts[contract][contractName],
				{
					spaces: 2
				}
			)
		}
	}
}

(function run () {
	createBuildFolder();
	compileContracts();
})();