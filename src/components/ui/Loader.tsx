import CircularProgress from '@mui/material/CircularProgress'
import "./loader.css"

function Loader() {
  return (
    <div className="loader-container">
        <CircularProgress size={80} />
    </div>
  )
}

export default Loader