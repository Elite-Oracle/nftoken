// const CardanocliJs = require("cardanocli-js");
// const os = require("os");
// const path = require("path");

// const dir = path.join(os.homedir(), "projects/cardano-minter");
// const shelleyPath = path.join(
//     os.homedir(),
//     "mainnet-relay",
//     "mainnet-shelley-genesis.json"
// );

// const cardanocliJs = new CardanocliJs({
//     network: `mainnet`,
//     dir,
//     shelleyGenesisPath: shelleyPath,
// });

// module.exports = cardanocliJs

const Cardano = require("cardanocli-js")

const cardano = new Cardano({
    network: "testnet-magic 1097911063",
    shelleyGenesisPath: "testnet-shelley-genesis.json"
    // dir: __dirname + "/.../",
    // shelleyGenesisPath: __dirname + "/../testnet-shelley-genesis.json"
})

module.exports = cardano