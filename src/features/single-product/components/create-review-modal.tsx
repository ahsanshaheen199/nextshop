import * as Dialog from '@radix-ui/react-dialog';
import { useActionState, useEffect, useState } from 'react';
import { Button } from '@/components/form/button';
import { FormLabel } from '@/components/form/label';
import StarRatingInput from '@/features/product/components/star-rating-input';
import { createProductReview } from '../actions';
import { jwtDecode } from 'jwt-decode';
import { toast } from '@/components/toast';
import { useQueryClient } from '@tanstack/react-query';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  session: string;
  productId: number;
};

export function CreateReviewModal({ open, setOpen, session, productId }: Props) {
  const decodedSession = jwtDecode(session as string) as {
    data: { user: { id: number; email: string; username: string } };
  };
  const queryClient = useQueryClient();
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>('');
  const [state, formAction, isPending] = useActionState(createProductReview, null);
  const createProductReviewAction = formAction.bind(null, {
    productId,
    reviewer: decodedSession.data.user.username,
    reviewerEmail: decodedSession.data.user.email,
    rating,
    review,
  });

  useEffect(() => {
    if (state?.success) {
      setOpen(false);
      setRating(0);
      setReview('');
      toast({
        title: 'Review submitted',
        description: 'Thank you for your review!',
        type: 'success',
      });

      queryClient.invalidateQueries({ queryKey: ['product-reviews', productId] });
    }

    if (state?.error) {
      toast({
        title: 'Error',
        description: state.error,
        type: 'error',
      });
    }
  }, [state]);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          setRating(0);
          setReview('');
        }
        setOpen(open);
      }}
    >
      <Dialog.Trigger asChild>
        <Button onClick={() => setOpen(true)}>Write a review</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed top-[50%] left-[50%] z-50 flex w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] flex-col gap-y-4 rounded-lg bg-white p-6 duration-200 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 sm:max-w-lg">
          <Dialog.Title className="font-satoshi-bold text-lg font-bold text-black">Write a review</Dialog.Title>
          <form action={createProductReviewAction}>
            <div className="mb-4 flex flex-col gap-y-4">
              <div>
                <FormLabel htmlFor="review" className="mb-2.5 inline-block">
                  Rating
                </FormLabel>
                <StarRatingInput
                  value={rating}
                  onChange={setRating}
                  max={5}
                  className="w-full"
                  starClassName="w-[23px] h-[23px]"
                />
              </div>

              <div>
                <FormLabel htmlFor="review" className="mb-2.5 inline-block">
                  Review
                </FormLabel>
                <textarea
                  id="review"
                  className="w-full rounded-lg border-0 p-2 px-4 py-3 text-sm text-black ring-1 ring-black/10 focus:ring-2 focus:ring-black"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end gap-x-2">
              <Button
                disabled={isPending}
                type="button"
                className="bg-white text-black ring-1 ring-black/10 hover:bg-black hover:text-white lg:px-5 lg:py-2"
                onClick={() => {
                  setOpen(false);
                  setRating(0);
                  setReview('');
                }}
              >
                Cancel
              </Button>
              <Button isLoading={isPending} disabled={!rating || isPending} type="submit" className="lg:px-5 lg:py-2">
                Submit
              </Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
