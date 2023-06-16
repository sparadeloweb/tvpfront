import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';

import NavItem from './NavItem';

export default function Header() {
  const refButton = useRef(null);
  const headerRef = useRef(null);
  const refNav = useRef(null);
  const [menuOpened, setMenuOpened] = useState(false);

  const onClickButton = () => {
    if (menuOpened) {
      refButton.current.className = 'header__btn';
      refNav.current.className = 'header__nav';
      document.body.classList.remove('body--active');
      setMenuOpened(false);
    } else {
      setMenuOpened(true);
      document.body.classList.add('body--active');
      refButton.current.className = 'header__btn header__btn--active';
      refNav.current.className = 'header__nav header__nav--active';
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = window.innerHeight * 0.5;
      if (window.scrollY > scrollThreshold) {
        headerRef.current.style.backgroundColor = '#151314';
      } else {
        headerRef.current.style.backgroundColor = 'transparent';
      }
    };
  
    if (typeof window !== 'undefined') {
        window.addEventListener('scroll', handleScroll, { passive: true });
      // Cleanup
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []); 
  

    return (
        <header className="header" ref={headerRef}>
            <div className='container-fluid px-5'>
                <div className='row'>
                    <div className='col-12'>
                        <div className="header__content">
                            <div className='header__logo__container'>
                                <Link href="/">
                                    <a className='header__logo'>
                                        <Image 
                                            src="/img/logo-largo-blanco.png"
                                            layout='fill'
                                        />
                                    </a>
                                </Link>
                            </div>
                            <ul className='header__nav' ref={refNav}>
                                <NavItem text="TV Programme" to="/"/>
                                <li className='header__nav-item'>
                                    <a className='header__nav-link' target="_blank" href="https://iidi.fr/" rel="noreferrer" >
                                        À propos de nous 
                                    </a>
                                </li>
                                <NavItem text="Contact" to="/contact"/>
                            </ul>

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