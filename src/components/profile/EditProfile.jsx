'use server'

import { useRef, useState } from 'react'
import { useMyProfileData } from '../../hooks/useMyProfileData'
import axios from 'axios'
import { ChangePicture } from '../editProfile/changePicture'
import { ChangeUsername } from '../editProfile/ChangeUsername'
import { ChangeDescription } from '../editProfile/ChangeDescription'
import { updateProfile } from '../../api/urlsUsers'
import { BASE_BACKEND_URL } from '../../api/baseUrl'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import { Button, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'

export function EditProfile () {
  const { myUsername, myUserData, myUserDescription } = useMyProfileData()
  const fotoPerfilUrl = myUserData && myUserData.foto_perfil
    ? `${BASE_BACKEND_URL}${myUserData.foto_perfil}`
    : null

  const [username, setUsername] = useState(myUsername)

  const [descripcion, setDescripcion] = useState('not-touch')

  const [imagePreviewUrl, setImagePreviewUrl] = useState(null)
  const [imageFile, setImageFile] = useState(null)

  const [croppedImageUrl, setCroppedImageUrl] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)
  const [cropper, setCropper] = useState(null)
  const cropperRef = useRef(null)

  const handleSave = async (e) => {
    e.preventDefault()
    try {
      const token = window.localStorage.getItem('token')
      await axios.put(
        updateProfile,
        {
          username,
          descripcion,
          foto_perfil: croppedImage
        },
        {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      )
    } catch (error) {
      console.error('Error al guardar los cambios:', error)
    } finally {
      if (username) {
        window.location.href = `/profile/${username}`
      } else {
        window.location.href = `/profile/${myUsername}`
      }
    }
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
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
    const croppedImageUrl = croppedImageBase64.toDataURL('image/jpeg')
    if (croppedImageBase64) {
      setCroppedImageUrl(croppedImageUrl)
    }

    croppedImageBase64.toBlob((blob) => {
      if (blob) {
        const croppedImageFile = new File([blob], imageFile.name, {
          type: 'image/jpeg'
        })
        setCroppedImage(croppedImageFile)
      }
    }, 'image/jpeg')

    setImageFile(null)
  }

  return (
    <>
    {imageFile
      ? (
      <div className='absolute z-50 flex flex-col p-4 overflow-y-auto transform -translate-x-1/2 -translate-y-1/2 rounded-xl bg-palette-3 w-96 top-1/2 left-1/2'>

        <Cropper
          ref={cropperRef}
          src={imagePreviewUrl}
          className= 'flex items-center justify-center w-full border border-palette-4 h-96'
          aspectRatio={1}
          guides={true}
          viewMode={1}
          minCropBoxHeight={50}
          minCropBoxWidth={50}
          background={false}
          zoomable={false}
          onInitialized={(instance) => {
            setCropper(instance) // Almacena la instancia de Cropper en el estado
          }}
        />

        <div className='flex justify-between mt-5'>
          <Button
            type='reset'
            color='danger'
            onPress={() => {
              setImageFile(null)
              setImagePreviewUrl(null)
              setCroppedImage(null)
            }}>
            Cancelar
          </Button>
          <Button
            onPress={onCrop}
            color='primary'
            className='hover:bg-blue-700'>
              Guardar
          </Button>
        </div>
      </div>
        )
      : (
        <form onSubmit={handleSave}>
          <ModalContent>
            <>
              <ModalHeader className="flex justify-between">
                <h2 className='text-2xl font-bold text-white'>Editar perfil</h2>
              </ModalHeader>
                <ModalBody>
                  <ChangePicture
                    fotoPerfilUrl={fotoPerfilUrl}
                    croppedImageUrl={croppedImageUrl}
                    handleFileChange={handleFileChange}
                  />

                  <ChangeUsername
                    setUsername={setUsername}
                    myUsername={myUsername}
                  />

                  <ChangeDescription
                    setDescripcion={setDescripcion}
                    myUserDescription={myUserDescription}
                  />
                </ModalBody>
                <ModalFooter>
                    <Button type='submit' color='primary'>
                      Guardar
                    </Button>
                </ModalFooter>
            </>
          </ModalContent>
        </form>
        )}
    </>
  )
}

export default EditProfile
