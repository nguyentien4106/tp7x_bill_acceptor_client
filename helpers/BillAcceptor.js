const TpSeries = require('tp-rs232');

const moneyValueChannel = {
  1 : 10000,
  2 : 20000,
  3 : 50000,
  4: 100000,
  5: 200000,
  6: 500000
}

const initBillAcceptor = (readBill) => {
    let serialPortConfig = {
      baudrate: 9600,
      databits: 8,
      stopbits: 1,
      parity: 'even'
    };
    
    let tp = new TpSeries({
      debug: false,
      timeout: 5000
    });
    
    tp.on("READ_NOTE", (result) => {
        tp.command("ACCEPT_BANKNOTE")
    });

    tp.on('STACKING', result => readBill(result));

    tp.open('COM4', serialPortConfig)
      .then(() => {
        console.log('GO!!!');
    
        tp.command('POWER_UP')
          .then(() => tp.command('ENABLE'))
          .then((result) => {
            console.log(result);
          });
      })
      .catch((error) => {
        console.log(error);
      });
}

class BillAcceptor{
  constructor(readBill){
    this.tp = initBillAcceptor(readBill)
  }
}

module.exports = {
  BillAcceptor : BillAcceptor
}