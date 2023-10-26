import { Spinner } from '@nextui-org/react'
import { Suspense, lazy } from 'react'

const AllPosts = lazy(() => import('../components/posts/AllPosts'))

export const IndexPage = () => {
  return (
    <div className='overflow-auto'>
      <div className='flex flex-col items-center md:mb-8 md:w-full'>

        <Suspense fallback={<Spinner className='w-full mt-4' />}>
          <AllPosts />
        </Suspense>

      </div>

    </div>
  )
}
