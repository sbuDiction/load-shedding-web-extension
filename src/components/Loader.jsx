const Loader = () => {
    return (
        <div id="loading_spinner" className="mt-3">
            <div className="d-grid justify-content-center">
                <div className="spinner-grow text-success" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    )
}

export default Loader;