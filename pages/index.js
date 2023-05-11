import Head from "next/head"
import TvGrid from "../components/TvGrid/Main"

export default function Home() {
  
  return (
    <>
      <Head>
        <title>TV Programme France - Par IIDI</title>
        <meta title="TV Programme France - Par IIDI"/>
      </Head>
      <TvGrid/>
    </>
  )
  
}
