import "../partials.css"

const Column = () => {
    return (
        <section className="column">
            <div className="column__header">
                <div className="dot"></div>
                <h1 className="text--medium">TODO (4)</h1>
            </div>

            <div className="column__card bg--dark-grey">
                <h2>Build UI for onboarding flow</h2>
                <h3 className="text--medium">0 of 3 subtasks</h3>
            </div>
        </section>
    )
}

export default Column