const Spinner = () => {
    return (
        <div>
            <div className=" z-50 fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 md:z-40">
                <div className="flex items-center justify-center">
                    <div className="w-24 h-24 border-t-8 border-b-8 border-darkwinered-color rounded-full animate-spin"></div>
                </div>
            </div>
        </div>
    )
}

export default Spinner