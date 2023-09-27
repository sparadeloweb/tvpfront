import Link from "next/link";
import Image from "next/image";

export default function ArticleList({ article }) {
    const link = `/article/${article.slug}`;
    const contentLimit = 150; // Limitar a 150 caracteres, puedes ajustar este valor
    const shortenedContent = `${article.content.rendered.substring(0, contentLimit)}`;

    console.log()

    return (
        <Link href={link}>
            <div className="article-containerr">
                <div className="image-container">
                    <Image
                        src={article._embedded['wp:featuredmedia'][0]?.source_url} // Asumiendo que 'featured_media' es la URL de la imagen
                        layout="fill"
                        alt={article.title.rendered}
                        className="article-image"
                    />
                </div>
                <div className="info-container info-article">
                    <h4>{article.title.rendered}</h4>
                    <p dangerouslySetInnerHTML={{ __html: shortenedContent }} />
                </div>
            </div>
        </Link>
    );
}
