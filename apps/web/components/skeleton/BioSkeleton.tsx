import { Skeleton } from '../ui/skeleton';

export const BioSkeleton = () => {
  return (
    <div className='flex flex-col text-center items-center justify-center md:flex-row-reverse md:space-x-4 md:text-left'>
        <div className='relative mx-auto w-80 h-60 md:w-1/2 md:mt-4'>
          <Skeleton className="h-full w-full object-cover" />
        </div>

        <div className='mt-6 md:mt-4'>
            <Skeleton className="h-8 w-full rounded md:w-2/3" />

            <div className='my-6'> 
                <Skeleton className="h-6 w-2/3 md:w-1/2 rounded" />
            </div>

            <div className="flex justify-center gap-6 md:justify-start md:order-first md:gap-8 lg:gap-12">
                <Skeleton className="h-8 w-16 rounded" />
                <Skeleton className="h-4 w-16 rounded" />
                <Skeleton className="h-4 w-16 rounded" />
                <Skeleton className="h-4 w-16 rounded" />
            </div>
        </div>
    </div>
    )
}

export default BioSkeleton