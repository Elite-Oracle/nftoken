const CardanocliJs = require("cardanocli-js");
const os = require("os");
const path = require("path");

const dir = path.join(os.homedir(), "nftoken");
const shelleyPath = path.join(
    os.homedir(),
    "nftoken",
    "testnet-shelley-genesis.json"
);

const cardanocliJs = new CardanocliJs({
    network: "testnet-magic 1097911063",
    dir,
    shelleyGenesisPath: shelleyPath,
});

module.exports = cardanocliJs