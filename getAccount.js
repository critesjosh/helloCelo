const ethers = require('ethers')
const fs = require('fs');

function getAccount() {
    return new Promise(resolve => {
        fs.readFile('./.secret', {encoding: 'utf-8'}, (err, data) => {
            if(data.length == 0){
                let randomWallet = ethers.Wallet.createRandom()
        
                fs.writeFile("./.secret", randomWallet.mnemonic, (err) => {
                    if(err) {
                        return console.log(err);
                    }
                })

                resolve(randomWallet)
            } else {
                resolve(new ethers.Wallet.fromMnemonic(data))
            }
        })
    })
}

module.exports = {
    getAccount
}