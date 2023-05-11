export default function SearchHeader () {
    return (
        <>
            <form action="#" className="header__search">
                <input className="header__search-input" type="text" placeholder="Chercher..." />
                <button className="header__search-button" type="button">
                    <i className="bx bx-search desktop-search-icon"></i>
                </button>
                <button className="header__search-close" type="button">
                    <i className="icon ion-md-close"></i>
                </button>
            </form>

            <button className="header__search-btn" type="button">
                <i className="bx bx-search"></i>
            </button>
        </>
    )
}