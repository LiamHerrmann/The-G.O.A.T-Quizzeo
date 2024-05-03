
const express = require('express')
const app = express()
const port = 8080

app.use(express.json());

// route

const quizRoutes = require('./routes/quiz_route');
const utilisateurRoutes = require('./routes/utilisateur_route');

app.use('/quiz', quizRoutes);
app.use('/utilisateur', utilisateurRoutes);

app.get('/', (_, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`app url: http://localhost:${port}`))