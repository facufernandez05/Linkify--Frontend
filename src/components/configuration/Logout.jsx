export function Logout ({ handleLogout }) {
  return (
    <div className='mt-4'>
      <button
        onClick={handleLogout}
        className='px-3 py-2 mx-auto text-white bg-red-500 rounded-md'
      >
        Cerrar sesión
      </button>
    </div>
  )
}
