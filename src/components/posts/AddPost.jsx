import axios from 'axios'
import { useContext, useState } from 'react'
import { useMyProfileData } from '../../hooks/useMyProfileData'
import { crearPublicacion } from '../../api/urlsPost'
import { CropperPost } from './CropperPost'
import { LoadingContext } from '../../context/loading'
import { Spinner } from '@nextui-org/react'

export default function AddPost ({ setNavBarView }) {
  const { loading, setLoading } = useContext(LoadingContext)
  const [description, setDescription] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null)

  const [croppedImageUrl, setCroppedImageUrl] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)
  const [cropper, setCropper] = useState(null)

  const { myUsername } = useMyProfileData()
  setNavBarView(false)

  const handlePost = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append('caption', description)
      formData.append('image', croppedImage)

      const token = window.localStorage.getItem('token')
      await axios.post(crearPublicacion, formData, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      window.location.href = `/profile/${myUsername}`
    } catch (error) {
      console.error('Error al crear la publicación:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]

    if (file) {
      setImageFile(file)

      const reader = new window.FileReader()
      reader.onload = (e) => {
        setImagePreviewUrl(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (event) => {
    event.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = () => {
    setDragOver(false)
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setDragOver(false)
    const file = event.dataTransfer.files[0]
    setImageFile(file)

    if (file) {
      const reader = new window.FileReader()
      reader.onload = (e) => {
        setImagePreviewUrl(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const onCrop = () => {
    // Obtén la porción recortada de la imagen y la almacena en 'croppedImage'
    const croppedImageBase64 = cropper.getCroppedCanvas()
    const croppedImageUrl = croppedImageBase64.toDataURL('image/webp')
    if (croppedImageBase64) {
      setCroppedImageUrl(croppedImageUrl)
    }

    croppedImageBase64.toBlob((blob) => {
      if (blob) {
        const croppedImageFile = new File([blob], imageFile.name, {
          type: 'image/webp'
        })
        setCroppedImage(croppedImageFile)
      }
    }, 'image/webp')

    setImageFile(false)
  }

  return (
    <form className={`flex h-screen items-center justify-center overflow-hidden bg-white font-sans py-6 ${
      dragOver ? 'border-4 border-dashed border-blue-500' : ''
    }`}
    >

      <div className='flex flex-col h-full p-6 mx-4 overflow-auto bg-white border-2 border-gray-300 shadow-xl max-sm:w-full rounded-2xl'>

        {imageFile && (
          <div className='max-w-lg mx-auto mt-4'>

            <CropperPost
            imagePreviewUrl={imagePreviewUrl}
            setCropper={setCropper}/>

            <div className='flex justify-center w-full mt-4'>
              <button
                type='button'
                className='px-4 py-2 mr-4 text-sm font-medium text-gray-700 border border-gray-300 rounded hover:text-gray-500 focus:outline-none focus:ring focus:ring-gray-200'
                onClick={() => {
                  setImageFile(null)
                  setImagePreviewUrl(null)
                }}>
                Cancelar
              </button>
              <button
                type='button'
                className='px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-500'
                onClick={onCrop}>
                Guardar
              </button>
            </div>
          </div>
        )}

        {!imageFile && !croppedImage && (
          <>
            <h2 className='mb-5 text-3xl font-bold text-gray-700 max-lg:hidden'>Crear publicación</h2>
            <label
            className='flex flex-col items-center w-full max-w-lg p-6 mx-auto text-center bg-white border-2 border-blue-400 border-dashed cursor-pointer my rounded-xl'
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}>

            <i className='text-6xl text-blue-500 fa-solid fa-arrow-up-from-bracket' />

            <h2 className='mt-4 text-xl font-medium tracking-wide text-gray-700'>Subir archivo</h2>

            <p className='mt-2 tracking-wide text-gray-500'>Sube o arrastra y suelta tu archivo SVG, PNG, JPG o GIF.</p>

            <input id='dropzone-file' type='file' accept='image/*' className='hidden' onChange={handleFileChange} />
            </label>
          </>
        )}

      {croppedImage &&
        (
        <>
          <label className='flex flex-col items-center max-w-lg p-6 mx-auto text-center bg-white border-2 border-blue-400 border-dashed rounded-xl'>
            <img
              src={croppedImageUrl}
              alt='Imagen de vista previa'
              className='object-cover mx-auto md:w-80 w-60 h-60 rounded-xl md:h-80'
            />
          </label>

          <label
            htmlFor='Descripcion'
            className='relative block w-full h-12 p-2 mx-auto my-10 border border-gray-200 rounded-md shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600'
          >
            <input
              type='text'
              placeholder='Descripcion'
              className='w-full h-full text-black placeholder-transparent bg-transparent border-none peer focus:border-transparent focus:outline-none focus:ring-0'
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
            />
            <span
              className='pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs'
            >
              Descripción
            </span>
          </label>

          <footer className='relative bottom-0 flex justify-end mt-auto'>
            <button
              type='reset'
              className='mr-6'
              onClick={() => {
                setImageFile(null)
                setImagePreviewUrl(null)
                setCroppedImage(null)
                setDescription('')
              }}
            >
              <i className='text-2xl text-red-600 transition-all fa-solid fa-trash-can hover:scale-110 hover:shadow-xl' />
            </button>
            <button
              type='submit'
              className='px-8 py-3 text-sm font-medium text-white transition bg-indigo-600 rounded hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500'
              onClick={handlePost}
              disabled={loading}>
                <span>{loading ? <Spinner size='sm' /> : 'Publicar' }</span>
            </button>
          </footer>
        </>
        )}

      </div>

    </form>
  )
}
