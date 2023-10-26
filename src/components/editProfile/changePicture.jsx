'use server'

export const ChangePicture = ({ fotoPerfilUrl, croppedImageUrl, handleFileChange }) => {
  return (
    <article className='relative flex items-center justify-center m-0 my-5'>

      <label
        htmlFor='profileImageInput'
        className='relative flex items-center justify-center object-cover w-24 h-24 cursor-pointer hover:opacity-100'
      >

        {croppedImageUrl
          ? <img src={croppedImageUrl} alt='Vista previa' className='relative flex items-center justify-center object-cover w-24 h-24 rounded-full hover:opacity-100' />
          : <img src={fotoPerfilUrl} alt='Foto de perfil' className='relative flex items-center justify-center object-cover w-24 h-24 rounded-full' />}
        <i className='absolute text-2xl -translate-x-1/2 -translate-y-1/2 fa-solid fa-camera-retro top-1/2 left-1/2' />
        <span className='absolute inset-0 flex items-center justify-center w-full h-full transition-opacity bg-black rounded-full opacity-0 bg-opacity-30 hover:opacity-100 '>
          <i className='absolute text-2xl -translate-x-1/2 -translate-y-1/2 fa-solid fa-camera-retro top-1/2 left-1/2 ' />
        </span>
      </label>

      <input
        type='file'
        id='profileImageInput'
        className='absolute w-0 h-0 opacity-0 pointer-events-none'
        onChange={handleFileChange}
      />

    </article>
  )
}
