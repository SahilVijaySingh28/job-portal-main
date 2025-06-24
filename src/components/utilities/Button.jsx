function Button({text}) {
    return (
        <>

            <button type="button" className="text-white bg-teal-500 hover:bg-teal-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-teal-500 dark:hover:bg-teal-500 dark:focus:bg-teal-500">
                {text}
            </button>
        </>
    )
}
export default Button;