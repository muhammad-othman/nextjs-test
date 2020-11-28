import Layout from '../../components/layout'
import Head from 'next/head'
import utilStyles from '../../styles/utils.module.scss'
import { GetStaticPaths, GetStaticProps } from 'next'

export default function Post({ recipe }) {
    if (!recipe)
        return (<h1>Loading</h1>)
    return (
        <Layout home={false}>
            <Head>
                <title>{recipe.title}</title>
                <meta name="og:title" content={recipe.title} />
                <meta
                    name="description"
                    content={recipe.description}
                />
                <meta
                    property="og:image"
                    content={recipe.image}
                />
            </Head>
            <article>
                <img
                    src={recipe.image}
                    className={`${utilStyles.headerHomeImage} ${utilStyles.borderCircle}`}
                    alt={recipe.title}
                />
                <h1 className={utilStyles.headingXl}>{recipe.title}</h1>
                <div className={utilStyles.lightText}>
                    {recipe.description}
                </div>

            </article>
        </Layout>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: "blocking"
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const res = await fetch(encodeURI(process.env.NEXT_PUBLIC_API_URL + 'recipe/recipe/' + params.slug));
    console.log(res);
    const recipe = await res.json();
    console.log(recipe);
    return {
        props: {
            recipe
        },
        revalidate: 20
    }
}