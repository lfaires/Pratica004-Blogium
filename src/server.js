import express from 'express'
import cors from 'cors'
import fs from 'fs'

const app = express()
app.use(express.json());
app.use(cors());
const count = 0;

  const posts = [];

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
    console.log(posts)
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
    let post = {}
    posts.forEach( item => {
        if(item.id === id){
            post = item;
            return
        }
    })
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

app.put('/posts/:idDoPost', (req,res) =>{
    const id = parseInt(req.params.idDoPost)
    const {content, coverUrl, title} = req.body
    posts.forEach( item => {
        if(item.id === id){
            item.content = content;
            item.coverUrl = coverUrl;
            item.title = title;
            return
        }
    })
    res.send("")
})

app.listen(4001, () =>{
    console.log("rodando o servidor!!!")
})