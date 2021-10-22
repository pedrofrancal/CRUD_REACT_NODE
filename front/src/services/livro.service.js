import http from "../http-common";

class LivroDataService {
    getAll(){
        return http.get("/livros");
    }

    get(id) {
        return http.get(`/livros/${id}`);
    }

    create(data) {
        return http.post("/livros", data);
    }

    update(id, data){
        return http.put(`/livros/${id}`, data);
    }

    delete(id) {
        return http.delete(`/livros/${id}`);
    }

    deleteAll(){
        return http.delete("/livros");
    }

    findByTitulo(titulo){
        return http.get(`livros?titulo=${titulo}`);
    }
}

export default new LivroDataService();