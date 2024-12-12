// import React, { useState } from 'react';
// import { useMutation, gql } from '@apollo/client';
// import BookReview from '../components/BookReview/BookReviews';

// // Define the GraphQL mutation for submitting a review with rating and comment
// const SUBMIT_BOOK_REVIEW = gql`
//   mutation SubmitBookReview($userId: ID!, $bookId: ID!, $rating: Int!, $comment: String!) {
//     submitBookReview(userId: $userId, bookId: $bookId, rating: $rating, comment: $comment) {
//       success
//       message
//       averageRating
//     }
//   }
// `;

// // Define the props for the parent component
// interface SubmitBookReviewFormProps {
//   userId: string;
//   bookId: string;
//   currentAverageRating: number;
// }

// const SubmitBookReviewForm: React.FC<SubmitBookReviewFormProps> = ({
//   userId,
//   bookId,
//   currentAverageRating,
// }) => {
//   const [rating, setRating] = useState(currentAverageRating);
//   const [comment, setComment] = useState('');
//   const [submitReview, { data, loading, error }] = useMutation(SUBMIT_BOOK_REVIEW);

//   const handleRatingChange = (newRating: number) => {
//     setRating(newRating);
//   };

//   const handleCommentChange = (newComment: string) => {
//     setComment(newComment);
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     submitReview({
//       variables: {
//         userId,
//         bookId,
//         rating,
//         comment,
//       },
//     });
//   };

//   const successMessage = data?.submitBookReview?.message || '';
//   const averageRating = data?.submitBookReview?.averageRating || null;

//   return (
//     <BookReview
//       rating={rating}
//       comment={comment}
//       onRatingChange={handleRatingChange}
//       onCommentChange={handleCommentChange}
//       onSubmit={handleSubmit}
//       loading={loading}
//       error={error ? error.message : null}
//       successMessage={successMessage}
//       averageRating={averageRating}
//     />
//   );
// };

// export default SubmitBookReviewForm;
