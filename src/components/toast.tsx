import { toast as sonnerToast } from 'sonner';
import { Cross } from './icons/cross';
import { twMerge } from 'tailwind-merge';

interface ToastProps {
  id: string | number;
  title: string;
  description?: string;
  type?: 'success' | 'error' | 'warning' | 'info';
}

export function toast(toast: Omit<ToastProps, 'id'>) {
  return sonnerToast.custom((id) => (
    <Toast id={id} title={toast.title} description={toast.description} type={toast.type} />
  ));
}

function Toast(props: ToastProps) {
  const { title, description, id, type } = props;

  return (
    <div
      className={twMerge(
        'z-20 flex w-[400px] justify-between rounded-lg border p-5',
        type === 'success' && 'border-[#1B5728]/10 bg-[#F2FDF5]',
        type === 'error' && 'border-[#571B23]/10 bg-[rgba(255,229,229,1)]'
      )}
    >
      <div className="flex flex-1 flex-col">
        <p
          className={twMerge(
            'text-sm font-semibold',
            type === 'success' && 'text-[#306339]',
            type === 'error' && 'text-[#9F2225]'
          )}
        >
          {title}
        </p>
        {description && (
          <p
            className={twMerge(
              'mt-1 text-sm',
              type === 'success' && 'text-[#15803D]',
              type === 'error' && 'text-[#9F2225]'
            )}
          >
            {description}
          </p>
        )}
      </div>
      <div className="ml-2 shrink-0">
        <button
          className="cursor-pointer"
          onClick={() => {
            sonnerToast.dismiss(id);
          }}
        >
          <Cross
            className={twMerge('h-5 w-5', type === 'success' && 'text-[#00BC8B]', type === 'error' && 'text-[#C02C3F]')}
          />
        </button>
      </div>
    </div>
  );
}
