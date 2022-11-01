import { FirestoreError } from 'firebase/firestore';

export const ErrorMessage = ({
  error,
  onHide,
}: {
  error: FirestoreError;
  onHide: () => void;
}) => {
  let errorMessage = '';
  switch (error.code) {
    case 'permission-denied':
      errorMessage = "You haven't got permission for this operation";
      break;
    case 'not-found':
      errorMessage = "Can't find such information";
      break;
    case 'resource-exhausted':
      errorMessage = 'Currently there are too many requests. Try again later.';
      break;
    default:
      'Something unexpected has occurred. Try again later.';
  }

  return (
    <div className="rounded bg-red-700 text-white p-2 flex gap-2">
      <div className="flex-1">
        <div className="font-bold text-xl">Error</div>
        <div className="max-w-fit break-words">{errorMessage}</div>
      </div>
      <button type="button" onClick={() => onHide()} className="font-bold">
        Hide
      </button>
    </div>
  );
};
