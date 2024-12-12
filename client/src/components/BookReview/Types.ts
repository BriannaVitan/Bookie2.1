export interface NewReview {
  title: string;
  author: string;
  rating: number;
  comment: string;
}

export interface BookReview extends NewReview {
  id: number;
}

export interface BookReviewsProps {
  initialReviews: BookReview[];
}

export interface NewReview {
  title: string;
  author: string;
  rating: number;
  comment: string;
}

export interface BookReview extends NewReview {
  id: number;
}

export interface BookReviewsProps {
  initialReviews: BookReview[];
}
// import { BookReview } from '../../types';

// export interface BookReviewsProps {
//   initialReviews?: BookReview[];
// }

// export interface NewReview {
//   title: string;
//   author: string;
//   rating: number;
//   comment: string;
// }