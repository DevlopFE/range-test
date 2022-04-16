import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

export const Loader = ({large = false}) => {
    return (
        <div className="container">
            <div className="loading"><FontAwesomeIcon icon={faSpinner} spin />{ large && ' Loading...' }</div>
        </div>
    )
}
