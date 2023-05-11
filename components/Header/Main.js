import Link from 'next/link'
import { useRef, useState } from 'react'

import NavItem from './NavItem'

export default function Header () {

    const refButton = useRef(null);

    const refNav = useRef(null)

    const [menuOpened, setMenuOpened] = useState(false);

    const onClickButton = () => {
        if (menuOpened) {
            refButton.current.className = "header__btn"
            refNav.current.className = "header__nav"
            document.body.classList.remove('body--active');
            setMenuOpened(false)
        } else {
            setMenuOpened(true)
            document.body.classList.add('body--active');
            refButton.current.className = "header__btn header__btn--active"
            refNav.current.className = "header__nav header__nav--active"
        }
    }

    return (
        <header className="header">
            <div className='container'>
                <div className='row'>
                    <div className='col-12'>
                        <div className="header__content">

                            <Link href="/">
                                <a className='header__logo'>
                                TV<span>PROGRAMME</span>
                                </a>
                            </Link>

                            <ul className='header__nav' ref={refNav}>
                                <NavItem text="TV Programme" to="/"/>
                                <li className='header__nav-item'>
                                    <a className='header__nav-link' target="_blank" href="https://iidi.fr/">
                                        À propos de nous 
                                    </a>
                                </li>
                            </ul>

                            <div className="header__auth">
                                <Link href="#contact">
                                    <a className="header__sign-in">
                                        <i className="bx bx-envelope contact-icon"></i>
                                        <span>Contact</span>
                                    </a>
                                </Link>
                            </div>

                            <button className="header__btn" type="button" ref={refButton} onClick={() => onClickButton()}>
                                <span></span>
                                <span></span>
                                <span></span>
						    </button>

                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}