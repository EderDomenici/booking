const  { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


async function getReservations(){

  const data = await prisma.booking.findMany({
      where: {
          statusBooking: 'Pendente'
      }
  })

  return data
}
async function checkPedingReservations(){
    const reservations = await getReservations()

    for(const reservation of reservations){
        const data = new Date()
        const dif = ((reservation.createdAt - data)*-1) / 3600000

        if(Math.floor(Math.abs(dif)) >= 1){

            await prisma.booking.update({
                where: {
                    id: reservation.id
                },
                data: {
                    statusBooking: 'Cancelado'
                }
            })
        }

    }

}

module.exports = checkPedingReservations