import Link from 'next/link'

export default function NavItem ({text, to}) {
    return (
        <li className='header__nav-item'>
            <Link href={to}>
                <a className='header__nav-link'>
                    {text}
                </a>
            </Link>
        </li>
    )
}