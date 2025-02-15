import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
})

export class LeituraService {
    listarTodos() {
        return axiosInstance.get('/minhas_leituras');
    }

    inserir(leitura : Projeto.Leitura) {
        return axiosInstance.post('/minhas_leituras', leitura);
    }

    alterar(leitura : Projeto.Leitura) {
        return axiosInstance.put(`/minhas_leituras/${leitura.id}`, leitura);
    }
    
    excluir(id : number) {
        return axiosInstance.delete('/minhas_leituras/' + id);
    }
}