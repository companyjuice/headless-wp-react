import React from 'react';
import Head from 'next/head';
import tachyons from 'tachyons/css/tachyons.min.css';
import stylesheet from '../src/styles/style.scss';
import parse from 'html-react-parser';

const gTag = "UA-30555133-1";
const gTagSrc = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag("js", new Date());
    gtag("config", "UA-30555133-1");
`;
//console.log(gTagSrc);

//import ReactGA from 'react-ga';
//ReactGA.initialize(gTag);
//ReactGA.pageview(window.location.pathname + window.location.search);

const Header = () => (
  <Head>
    <style
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: tachyons }}
    />
    <style
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: stylesheet }}
    />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charSet="utf-8" />
    <title>Web Marketing Specialists | Company Juice</title>
    <link rel="icon" type="image/png" href="/static/images/company_juice_logo_lime_straw_large_v002_86x86.png"></link>

    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-30555133-1"></script>
    <script>
      {parse(gTagSrc)}
    </script>

    {/* /static/images/company_juice_logo_lime_straw_large_v002_86x86.png */}

    {/*<!-- Schema.org markup for Google+ -->*/}
    <meta itemprop="name" content="Company Juice" />
    <meta itemprop="description" content="Web Marketing Specialists using React + WordPress" />
    <meta itemprop="image" content="https://companyjuice.com/static/images/company_juice_logo_lime_straw_large_v002_86x86.png" />

    {/*<!-- Twitter Card data -->*/}
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="Company Juice" />
    <meta name="twitter:description" content="Web Marketing Specialists using React + WordPress" />
    <meta name="twitter:creator" content="@CompanyJuice" />
    <meta name="twitter:image" content="https://companyjuice.com/static/images/company_juice_logo_lime_straw_large_v002_86x86.png" />

    {/*<!-- Facebook Open Graph data -->*/}
    <meta property="og:title" content="Company Juice" />
    <meta property="og:type" content="website" />
    <meta property="og:description" content="Web Marketing Specialists using React + WordPress" />
    <meta property="og:url" content="https://companyjuice.com/" />
    <meta property="og:image" content="https://companyjuice.com/static/images/company_juice_logo_lime_straw_large_v002_86x86.png" />

    {/*<!-- Apple data -->*/}
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="#1e1e1e" />
    <meta name="apple-mobile-web-app-title" content="Company Juice" />
    <meta name="format-detection" content="telephone=no" />
    <link rel="apple-touch-icon" sizes="57x57" href="/assets/images/icons/57.png" />
    <link rel="apple-touch-icon" sizes="60x60" href="/assets/images/icons/60.png" />
    <link rel="apple-touch-icon" sizes="72x72" href="/assets/images/icons/72.png" />
    <link rel="apple-touch-icon" sizes="76x76" href="/assets/images/icons/76.png" />
    <link rel="apple-touch-icon" sizes="114x114" href="/assets/images/icons/114.png" />
    <link rel="apple-touch-icon" sizes="120x120" href="/assets/images/icons/120.png" />
    <link rel="apple-touch-icon" sizes="144x144" href="/assets/images/icons/144.png" />
    <link rel="apple-touch-icon" sizes="152x152" href="/assets/images/icons/152.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/assets/images/icons/180.png" />
    <link rel="icon" type="image/png" sizes="192x192"  href="/assets/images/icons/192.png" />
    <link rel="icon" type="image/png" sizes="96x96" href="/assets/images/icons/96.png" />

    {/*<!-- Microsoft data -->*/}
    <meta name="msapplication-TileColor" content="#1e1e1e" />
    <meta name="msapplication-TileImage" content="https://companyjuice.com/static/images/company_juice_logo_lime_straw_large_v002_86x86.png" />
  </Head>
);

export default Header;
