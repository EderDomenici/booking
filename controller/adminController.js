const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');


const prisma = new PrismaClient();

module.exports  = {
    async index(req, res){
        const results = await prisma.admin.findMany();
        return res.json(results);
    },
    async createAdm(req, res) {
        const {name, login, password} = req.body

        if(!name || !login || !password){
            return res.status(400).send('Dados invalidos, preencha todos os campos')
        }

        const checkLogin = await prisma.admin.findFirst({
            where: {
                login: {contains: login}
            }
        })

        if(checkLogin){
            return res.status(400).send('Login ja existe')
        }

        const encrypted = bcrypt.hashSync(password, 10)

        await prisma.admin.create({
            data: {
                name,
                login,
                password: encrypted
            }
        })

        return res.status(201).send('Admin criado com sucesso')
    },

    async login(req, res) {
        const {login, password} = req.body

        const user = await prisma.admin.findUnique({
            where:{
                login
            }
        })

        if(!user){
            return res.status(400).send('Login ou senha invalidos')
        }

        const checkPassword = bcrypt.compareSync(password, user.password)

        if(!checkPassword){
            return res.status(400).send('Login ou senha invalidos')
        }

        if(login === user.login && checkPassword === true){
            return res.status(200).send('Login efetuado com sucesso')
        }

    },

    async updatePassword(req, res){
        const {id, password, newPassword} = req.body

        const user = await prisma.admin.findUnique({
            where:{
                id
            }
        })

        const checkPassword = bcrypt.compareSync(password, user.password)

        if(checkPassword){
            if(password === newPassword){
                return res.status(400).send('A nova senha deve ser diferente da antiga')
            }

            const encrypted = bcrypt.hashSync(newPassword, 10)

            await prisma.admin.update({
                where:{
                    id
                },
                data:{
                    password: encrypted
                }
            })
        }

        return res.status(200).send('Senha alterada com sucesso')
    }
}