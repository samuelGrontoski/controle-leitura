import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
})

export class LivroService {
    listarTodos() {
        return axiosInstance.get('/minha_estante');
    }

    inserir(livro : Projeto.Livro) {
        return axiosInstance.post('/minha_estante', livro);
    }

    alterar(livro : Projeto.Livro) {
        return axiosInstance.put(`/minha_estante/${livro.id}`, livro);
    }
    
    excluir(id : number) {
        return axiosInstance.delete('/minha_estante/' + id);
    }
}