import { PrismaClient } from '@prisma/client'
import express from 'express'
import cors from 'cors'

const prisma = new PrismaClient()
const app = express()

app.use(express.json())
app.use(cors())

// получить список всех  блюд
app.get('/dishes', async (req, res) => {
    const dishes = await prisma.dish.findMany({
        include: { category: true}
    })
    res.json(dishes)
})

// получить блюдо по id
app.get('/dish/:id', async (req, res) => {
    const { id } = req.params 
    const dish = await prisma.dish.findUnique({
        where: { id: Number(id) }
    })
    res.json(dish)
})

// получить список всех категорий
app.get('/categories', async (req, res) => {
    const categories = await prisma.category.findMany({
        // include: { dish: true}
    })
    res.json(categories)
})

// добавить блюдо
app.post('/dish', async (req, res) => {
    const { name, description, price, weight, category} = req.body
    const newDish = await prisma.dish.create({
        data: {
            name,
            description,
            price,
            weight,
            category: { connect: { name: category } }
        }
    })
    res.json(newDish)
})

// добавить категорию
app.post('/cat', async (req, res) => {
    const { name } = req.body
    const newCategory = await prisma.category.create({
        data: { name }
    })
    res.json(newCategory)
})

// изменение параметров блюда
app.put('/dish/:id', async (req, res) => {
    const { id } = req.params
    const updateDish = await prisma.dish.update({
        where: { id: Number(id) },
        data: { ...req.body }
    })
    res.json(updateDish)
})

// изменение категории
app.put('/cat/:id', async (req, res) => {
    const { id } = req.params
    const { name } = req.body
    const updateCategory = await prisma.category.update({
        where: { id: Number(id) },
        data: { name: name }
    })
    res.json(updateCategory)
})

// удаление блюда
app.delete('/dish/:id', async (req, res) => {
    const { id } = req.params
    const dish = await prisma.dish.delete({
        where: {
            id: Number(id)
        }
    })
    res.json(dish)
})

// удаление категории
app.delete('/cat/:id', async (req, res) => {
    const { id } = req.params
    const cat = await prisma.category.delete({
        where: {
            id: Number(id)
        }
    })
    res.json(cat)
})
  
app.listen(3000, () =>
    console.log('REST API server ready at: http://localhost:3000'),
)