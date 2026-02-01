import BaseService from './baseService';
import productData from '../data/products.json';

class ProductService extends BaseService {
  constructor() {
    super(productData);
  }

  async getBestsellers() {
    return this.query({ featured: true });
  }

  async getBySlug(slug) {
    return new Promise((resolve) => {
      const product = this.data.find(p => p.slug === slug);
      setTimeout(() => resolve(product), 300);
    });
  }

  async getNewArrivals() {
    return new Promise((resolve) => {
      const results = this.data.filter(item => item.badges.includes('NEW'));
      setTimeout(() => resolve(results), 300);
    });
  }

  async filterProducts({ category, size, color, sort }) {
    return new Promise((resolve) => {
      let results = [...this.data];

      if (category && category !== 'All') {
        results = results.filter(p => p.category === category);
      }
      if (size && size !== 'All') {
        results = results.filter(p => p.sizes.includes(size));
      }
      if (color && color !== 'All') {
        results = results.filter(p => p.colors.includes(color));
      }

      if (sort) {
        switch (sort) {
          case 'Price: Low to High':
            results.sort((a, b) => a.price - b.price);
            break;
          case 'Price: High to Low':
            results.sort((a, b) => b.price - a.price);
            break;
          case 'Newest':
            results.sort((a, b) => b.id.localeCompare(a.id));
            break;
          default:
            break;
        }
      }

      setTimeout(() => resolve(results), 300);
    });
  }
}

export const productService = new ProductService();
