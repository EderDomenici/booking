const express = require('express');
const cors = require('cors');
const nodeSchedule = require('node-schedule');

const checkPedingReservations = require('./controller/utils/checkPedingReservations')

const app = express();
const rule = '0 */12 * * *';

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000




const adminRoute = require('./routes/adminRoute')
const cottageRoute = require('./routes/cottageRoute')
const bookingRoute = require('./routes/bookingRoute')


app.use('/admin', adminRoute)
app.use('/cottage', cottageRoute)
app.use('/booking', bookingRoute)



const job  = nodeSchedule.scheduleJob(rule, async function(){
    console.log('Checking Pendings...');
    await checkPedingReservations();
})

app.listen(PORT,()=> console.log('Server is running 🚀'))