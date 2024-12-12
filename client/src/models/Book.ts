export interface Book {
  authors: [String],
  description: string;
  bookId: string;
  image: string;
  link: string;
  title: string;
}

export interface Rating {
  userId: string;
  rating: number;
}
