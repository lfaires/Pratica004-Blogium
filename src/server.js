import express from 'express'
import cors from 'cors'
import fs from 'fs'

const app = express()
app.use(express.json());
app.use(cors());
let count = 0;

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
    res.send(posts)
})

app.post('/posts', (req,res) => {
    const {content, coverUrl, title} = req.body
    const contentPreview = content.slice(0,50);
    const commentCount = 0
    const post = {id: `${count += 1}`,title, content, coverUrl ,contentPreview, commentCount}
    posts.push(post)
    res.send(post)
})

app.get('/posts/:id', (req,res) => {
    const {id} = req.params
    let post = {}
    posts.forEach( item => {
        if(item.id === id){
            post = item;
            return
        }
    })
    res.send(post)
})

app.post('/posts/:id/comments', (req,res) =>{
    const {id} = req.params
    const {postId, author, content } = req.body
    const comment = {id: `${count += 1}`, postId, author, content}
    const index = posts.findIndex( post => {
        return post.id === id
    })
    posts[index].commentCount += 1; 
    comments.push(comment)
    res.send(comment)
})

app.get('/posts/:id/comments', (req,res) =>{
    const {id} = req.params
    const comment = comments.filter( item => item.postId === id)
    res.send(comment)
})

app.put('/posts/:id', (req,res) =>{
    const {id} = req.params
    const {content, coverUrl, title} = req.body
    posts.forEach( post => {
        if(post.id === id){
            post.content = content;
            post.coverUrl = coverUrl;
            post.title = title;
            return
        }
    })
    res.send("editou")
})

app.delete('/posts/:id', (req,res) =>{
    const {id} = req.params
    const post = req.body
})

app.listen(4001, () =>{
    console.log("rodando o servidor!!!")
})