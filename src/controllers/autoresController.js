import autores from "../models/Autor.js";

class AutoresController {
            // Métodos estáticos !!
    static listarAutores = (req, res) => {
        autores.find((erro, autores) => { // se tiver um erro recuperando os autores
        res.status(200).json(autores);
    });
    }
    static listarAutorPorId = (req, res) => {
        const  id = req.params.id;
        
        autores.findById(id, (err, autores) => {
            if(err){
                res.status(400).send({message:`${err.message} - Id do Autor não localizado`});
            }else{
                res.status(200).send(autores);
            }
        })
    }
    static cadastrarAutor = (req, res) => {
        let autor = new autores(req.body);

        autor.save((err) => {
            if(err){
                res.status(500).send({message: `${err.message} - falha ao cadastrar o autor.`})
            }else{
                res.status(201).send(autor.toJSON());
            }                         //////
        })

    }
    static atualizarAutor = (req, res) => {
        const id = req.params.id // pega o id do autor
        //joga nesse autor desse id oq tem no req.body 
        autores.findByIdAndUpdate(id, {$set: req.body}, (err) => { // verifica se tem erro
            if(!err){
                res.status(200).send({message: 'autor foi atualizado com sucesso'});
            }else{
                res.status(500).send({message: err.message});
            }
        })  
    }
    static excluirAutor = (req, res) => {
        const id = req.params.id;
        autores.findByIdAndDelete(id, (err) => {
            if(!err){
                res.status(200).send({message: 'Autor foi exluido com sucesso'});
            }else{
                res.status(500).send({message: err.message});
            }
        })
    }

}

export default AutoresController;