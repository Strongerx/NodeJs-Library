import livros from "../models/Livro.js";

class LivroController {
            // Métodos estáticos !!
    static listarLivros = (req, res) => {
        livros.find()
            .populate('autor')        // relaciona a tabela com o autor
            .exec((erro, livros) => { // se tiver um erro recuperando os livros
            res.status(200).json(livros);
    });
    }
    static listarLivrosPorId = (req, res) => {
        const  id = req.params.id;
        
        livros.findById(id)
            .populate('autor', 'nome')
            .exec((err, livros) => {
            if(err){
                res.status(400).send({message:`${err.message} - Id do livro não localizado`});
            }else{
                res.status(200).send(livros);
            }
        })
    }
    static cadastrarLivro = (req, res) => {
        let livro = new livros(req.body);

        livro.save((err) => {
            if(err){
                res.status(500).send({message: `${err.message} - falha ao cadastrar livro.`})
            }else{
                res.status(201).send(livro.toJSON());
            }
        })

    }
    static atualizarLivro = (req, res) => {
        const id = req.params.id // pega o id do livro
        //joga nesse livro desse id oq tem no req.body 
        livros.findByIdAndUpdate(id, {$set: req.body}, (err) => { // verifica se tem erro
            if(!err){
                res.status(200).send({message: 'livro foi atualizado com sucesso'});
            }else{
                res.status(500).send({message: err.message});
            }
        })  
    }
    static excluirLivro = (req, res) => {
        const id = req.params.id;
        livros.findByIdAndDelete(id, (err) => {
            if(!err){
                res.status(200).send({message: 'Livro foi exluido com sucesso'});
            }else{
                res.status(500).send({message: err.message});
            }
        })
    }
    static listarLivroPorEditora = (req, res) => {
        const editora = req.query.editora

        livros.find({'editora': editora}, {}, (err, livros) => {
            res.status(200).send(livros);
        });
    }
}

export default LivroController;