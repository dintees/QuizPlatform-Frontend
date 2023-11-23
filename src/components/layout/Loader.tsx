import "../../assets/css/Loader.scss"

interface Props {
    loading: boolean
}

function Loader(props: Props) {
    const { loading } = props

    return (
        <>
        {loading ? 
        <div className="loader-container">
            <div className="loader"></div>
        </div>
        : <></>}
        </>
    )
}

export default Loader