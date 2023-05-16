import Head from "next/head";

const Meta = ({ title="Rates Radar", description="Explore and compare various financial accounts.", image="URL_TO_YOUR_IMAGE", url="WEBSITE_URL" }) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />

    {/* Open Graph Tags */}
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta property="og:url" content={url} />
    <meta property="og:type" content="website" />
  </Head>
);

export default Meta;
