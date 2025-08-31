'use client';

import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { ProductReview } from '@/types';
import { Rating } from '@/features/product/components/rating';
import { NextButton, PrevButton, usePrevNextButtons } from './reviews-arrow-button';

export function ReviewsCarouselClient({ reviews }: { reviews: ProductReview[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      slidesToScroll: 'auto',
      loop: true,
    },
    [Autoplay({ playOnInit: false, delay: 6000 })]
  );

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  const [visibleOriginalIndices, setVisibleOriginalIndices] = useState<number[]>([]);
  const [viewportEl, setViewportEl] = useState<HTMLDivElement | null>(null);

  const computeVisibleByDOM = useCallback(() => {
    if (!viewportEl) return;
    const viewportRect = viewportEl.getBoundingClientRect();
    const slideNodes = Array.from(
      (viewportEl.querySelector('[class*="touch-pin-zoom"]') || viewportEl).children
    ) as HTMLElement[];

    const visibles = slideNodes
      .map((el) => {
        const rect = el.getBoundingClientRect();
        const left = rect.left - viewportRect.left;
        const right = rect.right - viewportRect.left;
        const visible = right > 0 && left < viewportRect.width;
        const origIdxAttr = (el as HTMLElement).dataset?.slideIndex;
        const origIdx = origIdxAttr ? Number(origIdxAttr) : NaN;
        return { el, left, visible, origIdx };
      })
      .filter((it) => it.visible && Number.isFinite(it.origIdx))
      .sort((a, b) => a.left - b.left)
      .map((it) => it.origIdx as number);

    setVisibleOriginalIndices(visibles);
  }, [viewportEl]);

  useEffect(() => {
    if (!emblaApi) return;
    const autoplay = emblaApi.plugins()?.autoplay;
    if (!autoplay) return;

    if (reviews.length > 5) {
      autoplay.play();
    }
  }, [emblaApi, reviews.length]);

  useEffect(() => {
    if (!emblaApi) return;
    computeVisibleByDOM();
    emblaApi.on('select', computeVisibleByDOM);
    emblaApi.on('settle', computeVisibleByDOM);
    emblaApi.on('reInit', computeVisibleByDOM);
    emblaApi.on('scroll', computeVisibleByDOM);
  }, [emblaApi, computeVisibleByDOM]);

  return (
    <div>
      <div className="container mx-auto">
        <div className="relative mb-6 lg:mb-10">
          <h2 className="font-integral-bold text-[32px] leading-[36px] text-black lg:text-5xl">Our Happy Customers</h2>
          <div className="absolute right-0 bottom-0 z-10 flex gap-x-2">
            <PrevButton disabled={prevBtnDisabled} onClick={onPrevButtonClick} />
            <NextButton disabled={nextBtnDisabled} onClick={onNextButtonClick} />
          </div>
        </div>
      </div>

      <div className="mb-12 lg:mb-20">
        <div
          className="overflow-hidden"
          ref={(node) => {
            emblaRef(node);
            setViewportEl(node);
          }}
        >
          <div className="touch-pin-zoom -ml-5 flex touch-pan-y px-5 xl:px-0">
            {reviews.map((review, idx) => {
              const firstIdx = visibleOriginalIndices[0];
              const lastIdx = visibleOriginalIndices[visibleOriginalIndices.length - 1];
              const isFirstVisible = firstIdx === idx;
              const isLastVisible = lastIdx === idx;
              const edgeClass = isFirstVisible ? 'is-first-visible' : isLastVisible ? 'is-last-visible' : '';
              return (
                <div
                  key={review.id}
                  data-slide-index={idx}
                  className={`relative min-w-0 shrink-0 grow-0 basis-full translate-x-0 translate-y-0 translate-z-0 transform pl-5 select-none md:basis-1/2 lg:basis-1/3 xl:basis-[20%] ${edgeClass}`}
                >
                  <div className="rounded-[20px] border border-black/10 px-8 py-7">
                    <div className="mb-2 lg:mb-3">
                      <Rating
                        fullStarClassName={'lg:w-[23px] w-[19px] h-[19px] lg:h-[23px]'}
                        halfStarClassName={'lg:w-[11px] lg:h-[23px] w-[9px] h-[17px]'}
                        averageRating={isNaN(Number(review.rating)) ? 0 : Number(review.rating)}
                      />
                    </div>
                    <h4 className="mb-2 inline-flex font-satoshi-bold text-base leading-[22px] text-black lg:mb-3 lg:text-xl">
                      {review.reviewer}
                    </h4>
                    <div
                      className="mb-2 lg:mb-3 [&_p]:font-satoshi [&_p]:text-sm [&_p]:leading-[22px] [&_p]:text-black/60 [&_p]:lg:text-base"
                      dangerouslySetInnerHTML={{ __html: review.review }}
                    ></div>
                    <p className="font-satoshi-medium text-sm leading-[22px] text-black/60 lg:text-base">
                      Posted on {review.formatted_date_created}
                    </p>
                  </div>
                  {(isFirstVisible || isLastVisible) && (
                    <div className="absolute top-0 right-0 z-10 hidden h-full w-full bg-white/10 backdrop-blur-[2px] xl:block" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
