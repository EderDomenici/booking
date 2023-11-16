const { PrismaClient } = require('@prisma/client');



const prisma = new PrismaClient();


module.exports = {

    async getCottages(req, res) {
        const cottages = await prisma.cottage.findMany();

        return res.json(cottages);
    },
    async createCottage(req, res) {
        const {name,
               description,
               photo,
               capacity,
               amount,
               overnightWeek,
               overnightWeekend} = req.body;

        if(overnightWeek === overnightWeekend){
            return res.status(400).send('Valor da Diaria semanal está igual ao valor das Diarias de Fds/Feriados')
        }
        await prisma.cottage.create({
            data: {
                name,
                description,
                photo,
                capacity,
                amount,
                overnightWeek,
                overnightWeekend
            }
        })

        return res.status(201).send('Acomodação criada com sucesso')

    },

    async updateCottage(req, res){
        const {id,
              description,
              photo,
              amount,
              overnightWeek,
              overnightWeekend} = req.body;

      const update = {}

        let cottage

        if(id){
            cottage = await prisma.cottage.findUnique({
                where:{
                    id
                }
            })
        } else {
            return res.status(404).send('Acomodação não encontrada')
        }

        if(description){update.description = description}
        if(photo){update.photo = photo}
        if(amount){update.amount = amount}
        if(overnightWeek){update.overnightWeek = overnightWeek}
        if(overnightWeekend){update.overnightWeekend = overnightWeekend}

        if(Object.keys(update).length > 0){
            await prisma.cottage.update({
                where:{
                    id : cottage.id
                },
                data: update
            })

        } else {
            return res.status(400).send('Nenhum dado alterado')
        }

        return res.status(200).send('Acomodação atualizada com sucesso')
    },

    async deleteCottage(req, res){
        const {id} = req.body;

        await prisma.cottage.delete({
            where:{
                id
            }
        })

        return res.status(200).send('Acomodação deletada com sucesso')
    }

}