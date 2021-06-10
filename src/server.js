import express from 'express'
import cors from 'cors'
import fs from 'fs'

const app = express()
app.use(express.json());
app.use(cors());
const count = 0;

const posts = [{
    id: 1,
    title: 'Hello World',
    coverUrl: 'https://miro.medium.com/max/1024/1*OohqW5DGh9CQS4hLY5FXzA.png',
    content: 'Este é o conteúdo do post, o que realmente vai aparecer na página do post...',
    contentPreview: 'Esta é a estrutura de um post esperado pelo front-end',
    commentCount: 2
  }];

  const comments = [{
    id: 1,
    postId: 1,
    author: 'João',
    content: 'Muito bom esse post! Tá de parabéns'
  }, {
    id: 2,
    postId: 1,
    author: 'Maria',
    content: 'Como faz pra dar palmas?'
  }]

app.get('/posts', (req,res) => {
    console.log("recebi um pedido para ter os posts")
    res.send(posts)
})

app.post('/posts', (req,res) => {
    const contentPreview = 'Esta é a estrutura de um post esperado pelo front-end';
    const post = {id: posts.length +1,...req.body,contentPreview: contentPreview}
    posts.push(post)
    res.send(post)
    console.log(posts)
})

app.get('/posts/:idDoPost', (req,res) => {
    const id = parseInt(req.params.idDoPost)
    const post = posts.filter( item => item.id === id)[0]
    console.log(post)
    res.send(post)
})

app.post('/posts/:idDoPost/comments', (req,res) =>{
    const id = parseInt(req.params.idDoPost)
    const comment = {id: count+1,...req.body}
    comments.push(comment)
    res.send(comment)
})

app.get('/posts/:idDoPost/comments', (req,res) =>{
    const id = parseInt(req.params.idDoPost)
    const comment = comments.filter( item => item.postId === id)
    res.send(comment)
})

app.listen(4001, () =>{
    console.log("rodando o servidor!!!")
})