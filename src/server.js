import express from 'express'
import cors from 'cors'


const app = express()
app.use(express.json());
app.use(cors());

const posts = [{
    id: 1,
    title: 'Hello World',
    coverUrl: 'https://miro.medium.com/max/1024/1*OohqW5DGh9CQS4hLY5FXzA.png',
    contentPreview: 'Esta é a estrutura de um post esperado pelo front-end',
    content: 'Este é o conteúdo do post, o que realmente vai aparecer na página do post...',
    commentCount: 2
  }];

app.get('/posts', (req,res) => {
    console.log("recebi um pedido para ter os posts")
    res.send(posts)
})

app.post('/posts', (req,res) => {
    console.log("recebi um pedido para adicionar os posts")
    const contentPreview = 'Esta é a estrutura de um post esperado pelo front-end';
    const post = {...req.body,id: posts.length +1,contentPreview: contentPreview}
    posts.push(post)
    console.log(post)
    res.send(post)
})

console.log("rodando o servidor!!!")
app.listen(4001)