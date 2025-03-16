import { GlobalStateProvider } from './store/providers/GlobalStateProvider'
import Header from './components/Header'
import Modpacks from './views/Modpacks'
import { Route, Routes } from 'react-router-dom'
import Friends from './views/Friends'
import FileDownloader from './components/FileDownloader'

function App(): JSX.Element {
  return (
    <GlobalStateProvider>
      <div className="flex flex-col h-screen w-screen flex-start">
        <Header />
        <FileDownloader />
        <div>
          <Routes>
            <Route path="/" element={<Modpacks />} />
            <Route path="/friends" element={<Friends />} />
          </Routes>
        </div>
      </div>
    </GlobalStateProvider>
  )
}

export default App
