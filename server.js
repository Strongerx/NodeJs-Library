import app from './src/app.js';

const port = 3000;

// escuta a porta 
app.listen(port, () => {
    console.log(`Servidor escutando em http://localhost:${port}`);
})

