const Kit = require('@celo/contractkit')
const getAccount = require('./getAccount').getAccount

const kit = Kit.newKit('https://alfajores-forno.celo-testnet.org')

let anAddress = '0xD86518b29BB52a5DAC5991eACf09481CE4B0710d'

getAccount().then(wallet => {
    kit.addAccount(wallet.privateKey)
    kit.contracts.getGoldToken().then(goldtoken => { 
        goldtoken.transfer(anAddress, 100000).send({from: wallet.address}).then(tx => {
            return tx.waitReceipt()
        }).then(receipt => {
            console.log(receipt)
            return goldtoken.balanceOf(wallet.address)
        }).then(balance => {
            console.log(balance.toString())
        })
    })    
})