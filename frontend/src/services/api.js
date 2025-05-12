import axios from 'axios';

//Conexão com API - Backend (temporaremente desativado)
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
    headers:{
        'Content-Type': 'application/json'
    }
});

//Interceptor para adicionar o token de autenticação
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if(token){
        config.headers.Authorization = `Bearer ${token}`; 
    }
    return config;
});

//Interceptor para tratar erros de reposta
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response){
            //Erro do servidor
            const { status, data } = error.response;

            switch(status){
                case 401:
                    //Token expirado ou inválido
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                    break;
                case 403:
                    //Acesso negado
                    console.error('Acesso negado:', data.message);
                    break;
                case 404:
                    //Recurso não encontrado
                    console.error('Recursos não encontrado:', data.message);
                    break;
                case 500:
                    //Erro interno do servidor
                    console.error('Erro interno do servidor:', data.message);
                    break;
                default:
                    console.error('Erro na requisião:', data.message);
            }
        }else if(error.request){
            //Erro de rede
            console.error('Erro de rede:', error.request);
        }else{
            //Erro na configuração da requisição
            console.error('Erro na requisição:', error.message);
        }
        return Promise.reject(error);
    }
);

export default api;
