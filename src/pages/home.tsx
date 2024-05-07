import FavoriteCategory from "@/components/homeAuth/favoriteCategoty"
import FeaturedCategory from "@/components/homeAuth/featuredCategory"
import FeaturedSection from "@/components/homeAuth/featuresSection"
import NewestCategory from "@/components/homeAuth/newestCategory"
import Head from "next/head"
import { Container } from 'reactstrap'

const HomeAuth = function () {
    return <>
        <Head>
        <title>Onebitflix - Home</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
        </Head>
        <main>
            <FeaturedSection />
            <NewestCategory />
            <FavoriteCategory />
            <FeaturedCategory />
        </main>
    </>
}

export default HomeAuth