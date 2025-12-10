import { Injectable } from '@nestjs/common';

export const categories = [
  {
    id: 1,
    name: 'Sample Category',
    coverUrl: 'https://example.com/category-cover.jpg',
  },
  {
    id: 2,
    name: 'Another Category',
    coverUrl: 'https://example.com/another-category-cover.jpg',
  },
];

@Injectable()
export class CategoriesService {
  findAll() {
    return categories;
  }

  findOne(id: number) {
    return categories.find((category) => category.id === id);
  }
}
