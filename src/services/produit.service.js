import http from "../http-common";

class ProduitDataService {
  getAll() {
    return http.get("/Produits");
  }

  get(id) {
    return http.get(`/Produits/${id}`);
  }

  create(data) {
    return http.post("/Produits", data);
  }

  update(id, data) {
    return http.put(`/Produits/${id}`, data);
  }

  delete(id) {
    return http.delete(`/Produits/${id}`);
  }

  deleteAll() {
    return http.delete(`/Produits`);
  }

  findByReference(reference) {
    return http.get(`/Produits?reference=${reference}`);
  }
  findByZoneExposition(zoneExposition) {
    return http.get(`/Produits?zoneExposition=${zoneExposition}`);
  }
}

export default new ProduitDataService();