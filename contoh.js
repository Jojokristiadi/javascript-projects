/*
dalam node js, ada module yang udh default
namanya eventEmitter untuk melakukan event-driven
*/

const {eventEmitter} = require('events')

const myEventEmitter = new eventEmitter();
 
// fungsi yang akan dijalankan ketika event coffee-order terjadi
const makeCoffee = ({name}) =>{
    console.log(`Halo ${name}, selamat menikmati!`)
}

// mendaftarkan fungsi makeCoffee sebagai listener event coffee-order
myEventEmitter.on('minum kopi',makeCoffee)