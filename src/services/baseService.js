/**
 * BaseService
 * Provides a standard interface for fetching data.
 * Currently uses local JSON data, but can be easily swapped for fetch/axios.
 */

class BaseService {
  constructor(data) {
    this.data = data;
  }

  async getAll() {
    // Simulate network delay
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.data), 300);
    });
  }

  async getById(id) {
    return new Promise((resolve) => {
      const item = this.data.find(item => item.id === id);
      setTimeout(() => resolve(item), 300);
    });
  }

  async query(filters) {
    // Basic filter implementation
    return new Promise((resolve) => {
      let results = [...this.data];
      
      if (filters.category) {
        results = results.filter(item => item.category === filters.category);
      }
      
      if (filters.featured) {
        results = results.filter(item => item.isFeatured === true);
      }

      setTimeout(() => resolve(results), 300);
    });
  }
}

export default BaseService;
