import { useRef } from 'react'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'

export function CropperPost ({ imagePreviewUrl, setCropper }) {
  const cropperRef = useRef(null)
  return (
    <Cropper
      ref={cropperRef}
      src={imagePreviewUrl}
      className='flex items-center justify-center object-cover w-full h-full border border-gray-400 md:w-468 md:h-468 max-h-96'
      aspectRatio={1}
      guides={true}
      viewMode={1}
      background={false}
      zoomable={false}
      onInitialized={(instance) => {
        setCropper(instance) // Almacena la instancia de Cropper en el estado
      }}
      minCanvasWidth={320}
      minCanvasHeight={320}
    />
  )
}
