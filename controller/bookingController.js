const validateCpf = require('./utils/validateCpf')

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


module.exports = {
    async getBookings(req, res){
        const results = await prisma.booking.findMany();

        return res.json(results);

    },

    async createBooking(req, res){
        const {checkIn,
               checkOut,
               responsibleName,
               responsibleCpf,
               email,
               phone,
               adultsNumbers,
               childNumbers,
               bookingValue,
               protocol,
               pet,
               cottageId} = req.body;

        if(!validateCpf(responsibleCpf)){
            return res.status(400).send('CPF inválido');
        }

        await prisma.booking.create({
            data: {
                checkIn,
                checkOut,
                responsibleName,
                responsibleCpf,
                email,
                phone,
                adultsNumbers,
                childNumbers,
                bookingValue,
                protocol,
                pet,
                cottageId
            }
        })

        return res.status(201).send('Reserva criada com sucesso');
    },

    async updatingBooking(req, res){

        const {id, statusBooking} = req.body;

        await prisma.booking.update({
            where: {
                id
            },
            data: {
                statusBooking
            }
        })

        return res.status(200).send(`Reserva ${statusBooking} com sucesso`);

    },



}

