import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

export default function Home({ recipes }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <ul className={utilStyles.list}>
          {recipes.map(({ slug, image, title }) => (
            <li className={utilStyles.listItem} key={slug}>
              <img
                src={process.env.NEXT_PUBLIC_ASSETS_URL + image}
                className={`${utilStyles.headerHomeImage} ${utilStyles.borderCircle}`}
                alt={title}
              />
              <Link href={`/recipes/${slug}`}>
                <a>{title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + 'recipe/search');
  const json = await res.json();
  return {
    props: {
      recipes: json.data
    }
  }
}