const cardano = require("./cardano")

const sender = cardano.wallet("ISADA")

console.log(
    sender.balance()
)