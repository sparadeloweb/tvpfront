import Image from "next/image"
import Link from "next/link"

export default function Footer () {
    return (
        <footer>
            <div className="row">
                <div className="col-md-6 col-sm-12 relative">
                    <Link href="/">
                        <div className="footer-logo-container">
                            <Image 
                                src="/img/logo-largo-blanco.png"
                                layout='fill'
                            />
                        </div>
                    </Link>
                </div>
                <div className="col-md-6 col-sm-12 copyright">
                    <a className="footer_item" target="_blank" href="https://iidi.fr/" rel="noreferrer" >
                        Site créé par IIDI - Agence web transversale - Création site internet - Design Graphique - Webmarketing
                    </a>
                    <Link passHref href="/articles">
                        <a className="footer_item">Articles</a>
                    </Link>
                    <Link passHref href="/contact">
                        <a className="footer_item">Contact</a>
                    </Link>
                </div>
            </div>
        </footer>
    )
}