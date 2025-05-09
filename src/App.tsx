import {LecturaForm} from './LecturaForm.tsx'
import {RegistroLectura} from './RegistroLectura.tsx'

function App() {
  return (
    <>
      <div className="bg-zinc-800 h-screen text-white flex flex-col items-center justify-center">
        <div className="bg-gray-950 p-4 w-11/12 rounded-lg flex flex-col items-center">
          <RegistroLectura />
          <LecturaForm />
          </div>
      </div>
    </>
  )
}

export default App
