import { Button } from '@nextui-org/react'
import usePostLogic from '../../hooks/usePostLogic'
import { useMyProfileData } from '../../hooks/useMyProfileData'

export function PostLikeButton ({ publicacion }) {
  const { handleLikePost } = usePostLogic()
  const { myUserId } = useMyProfileData()
  return (
    <Button isIconOnly onPress={() => handleLikePost(publicacion?.id)} color='danger' size='md' className='hover:bg-palette-6'>
      {publicacion?.likes_users?.includes(myUserId) || publicacion?.liked
        ? (
            <i className='text-xl fa-solid fa-heart'/>
          )
        : (
            <i className='text-xl fa-regular fa-heart'/>
          )}
    </Button>
  )
}
