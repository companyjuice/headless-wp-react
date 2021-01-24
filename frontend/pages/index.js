import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import WPAPI from 'wpapi';
import Layout from '../components/Layout';
import PageWrapper from '../components/PageWrapper';
import Menu from '../components/Menu';
import Config from '../config';
import Logo from '../static/images/company_juice_logo_lime_straw_large_v002_512x512.svg';

import WPShortcodes from '../src/js/WPShortcodes';

import Card from '../src/js/tachyons-styled-react-master/src/components/Card';
import {Article, Div, Section, P, H3, H4, Img, A} from '../src/js/tachyons-styled-react-master/src/elements';

const wp = new WPAPI({ endpoint: Config.apiUrl });

const headerImageStyle = {
  marginTop: 50,
  marginBottom: 50,
};

const tokenExpired = () => {
  if (process.browser) {
    localStorage.removeItem(Config.AUTH_TOKEN);
  }
  wp.setHeaders('Authorization', '');
  Router.push('/login');
};

class Index extends Component {
  state = {
    id: '',
  };

  static async getInitialProps() {
    try {
      const [page, posts, pages, portfolios] = await Promise.all([
        wp
          .pages()
          .slug('welcome')
          .embed()
          .then(data => {
            return data[0];
          }),
        wp.posts().perPage( 15 ).page( 1 ).embed(),
        wp.pages().perPage( 17 ).page( 1 ).embed(),
        wp.types().type('portfolio').perPage( 15 ).page( 1 ).embed(),
      ]);

      return { page, posts, pages, portfolios };
    } 
    catch (err) {
      if (err.data !== undefined && err.data.status === 403) {
        tokenExpired();
      }
    }

    return null;
  }

  componentDidMount() {
    const token = localStorage.getItem(Config.AUTH_TOKEN);
    if (token) {
      wp.setHeaders('Authorization', `Bearer ${token}`);
      wp.users()
        .me()
        .then(data => {
          const { id } = data;
          this.setState({ id });
        })
        .catch(err => {
          if (err.data !== undefined && err.data.status === 403) {
            tokenExpired();
          }
        });
    }
  }

  render() {
    const { id } = this.state;
    const { posts, pages, portfolios, headerMenu, page } = this.props;

    const functionMapShortcodes = () => {
      //return;
    }

    let imageSrc = "/static/images/wordpress-plus-react-header.png";

    const var1 = "hey hey hey";
    const var2 = "yo yo yo";
    const shortcodes = WPShortcodes( `[myshortcode var1="${var1}" var2="${var2}"]`, functionMapShortcodes );
    console.log("---------------------");
    console.log("shortcodes");
    console.log(shortcodes);
    console.log("---------------------");
    console.log("---------------------");
    console.log("functionMapShortcodes");
    console.log(functionMapShortcodes);
    console.log("---------------------");
    
    const fposts = posts.map(ipost => {
      if (ipost.slug !== 'hey' 
       && ipost.slug !== 'hey'
       && ipost.slug !== 'hey') {
        // console.log("------------------");
        // console.log("ipost-------------");
        // console.log(ipost);
        // console.log("------------------");
        if (ipost._embedded 
         && ipost._embedded['wp:featuredmedia']
         && ipost._embedded['wp:featuredmedia'][0].source_url) {
          imageSrc = ipost._embedded['wp:featuredmedia'][0].source_url;
        }
        return (
          <ul key={ipost.slug}>
            <li className="fl w-100">
              <div className="fl w-third">
                <Link
                  as={`/post/${ipost.slug}`}
                  href={`/post?slug=${ipost.slug}&apiRoute=post`}
                >
                  <img src={imageSrc} />
                </Link>
              </div>
              <div className="fl w-two-thirds pl3">
                <Link
                  as={`/post/${ipost.slug}`}
                  href={`/post?slug=${ipost.slug}&apiRoute=post`}
                >
                  <a>{ipost.title.rendered}</a>
                </Link>
              </div>
            </li>
          </ul>
        );
      }
    });
    const fpages = pages.map(ipage => {
      if (ipage.slug !== 'welcome' 
       && ipage.slug !== 'privacy'
       && ipage.slug !== 'contact'
       && ipage.slug !== 'terms-conditions') {
        // console.log("------------------");
        // console.log("ipage-------------");
        // console.log(ipage);
        // console.log("------------------");
        if (ipage._embedded 
         && ipage._embedded['wp:featuredmedia']
         && ipage._embedded['wp:featuredmedia'][0].source_url) {
          imageSrc = ipage._embedded['wp:featuredmedia'][0].source_url;
        }
        return (
          <ul key={ipage.slug}>
            <li className="fl w-100">
              <div className="fl w-third">
                <Link
                  as={`/page/${ipage.slug}`}
                  href={`/post?slug=${ipage.slug}&apiRoute=page`}
                >
                  <img src={imageSrc} />
                </Link>
              </div>
              <div className="fl w-two-thirds pl3">
                <Link
                  as={`/page/${ipage.slug}`}
                  href={`/post?slug=${ipage.slug}&apiRoute=page`}
                >
                  <a>{ipage.title.rendered}</a>
                </Link>
              </div>
            </li>
          </ul>
        );
      }
    });
    const fportfolios = portfolios.map(iportfolio => {
      if (iportfolio.slug !== 'hey' 
       && iportfolio.slug !== 'hey'
       && iportfolio.slug !== 'hey') {
        // console.log("------------------");
        // console.log("iportfolio-------------");
        // console.log(iportfolio);
        // console.log("------------------");
        if (iportfolio._embedded 
         && iportfolio._embedded['wp:featuredmedia']
         && iportfolio._embedded['wp:featuredmedia'][0].source_url) {
          imageSrc = iportfolio._embedded['wp:featuredmedia'][0].source_url;
        }
        return (
          <div className="fl w-third-l" style={{height: '280px'}}>
            <Article overflow='hidden' 
              borderRadius={2} border='0px solid' borderColor='silver' 
              px={2} py={3}>
              <Div position='relative'>
                <Div position='absolute' top={16} right={16} width='auto' px={2} py={1} 
                  borderRadius={1} bg='black-80' color='white' fontSize={0}>
                  <P my={0} lineHeight='1.0'>{/*Category Label*/}</P>
                </Div>
                <Link
                  as={`/portfolio/${iportfolio.slug}`}
                  href={`/post?slug=${iportfolio.slug}&apiRoute=portfolio`}
                >
                  <Img src={imageSrc} />
                </Link>
              </Div>
              <Div px={[1,2]} py={[1,2]}>
                <H3 fontSize={3} mt={0} mb={1}
                  dangerouslySetInnerHTML={{
                    __html: iportfolio.title.rendered,
                  }} />
                {/*<H4 fontSize={1} mt={0} mb={2} lineHeight={1.25}>A sample subtitle example</H4>*/}
                {/*<P fontSize={1} my={0}
                  dangerouslySetInnerHTML={{
                    __html: iportfolio.excerpt.rendered,
                  }} />*/}
                
                <A href={`/portfolio/${iportfolio.slug}`} fontWeight={700} fontSize={1} color='dark-blue' 
                  borderRadius={3} px={0} py={2} >Learn More</A> 
              </Div>
            </Article>
          </div>
        );
      }
    });

    return (
      <Layout>
        <Menu menu={headerMenu} />
        <div className="intro bg-black white ph3 pv4 ph5-m pv5-l flex flex-column flex-row-l">
          <div className="color-logo w-40-l mr3-l">
            <Logo width={280} height={280} />
          </div>
          <div className="subhed w-60-l pr6-l">
            <h1>{page.title.rendered}</h1>
            <div className="dek">
              Give your company a boost with our team of certified online marketers + full-stack web developers.
            </div>
            <div className="api-info b mt4">
              Our developers specialize in JavaScript, React, WordPress + SQL for REST APIs + GraphQL.
              Our marketers specialize in SEO, Social Media, Lead Generation, + Sales Fulfillment.
              <div className="api-toggle">
                <a className="rest" href="http://companyjuice.com:3000/page/contact">CONTACT US</a>
                <a className="graphql" href="https://companyjuice.freshdesk.com/support/home" target="_blank">KNOWLEDGEBASE</a>
              </div>
            </div>
          </div>
        </div>
        <div className="recent flex mh4 mv4 w-80-l center-l">
          <div className="w-50 pr3">
            <h2>Pages</h2>
            {fpages}
          </div>
          <div className="w-50 pl3">
            <h2>Posts</h2>
            {fposts}
          </div>
        </div>
        <div className="recent flex mh4 mv4 w-80-l center-l">
          <div className="w-100-l">
            <h2>Portfolio</h2>
            {fportfolios}
          </div>
        </div>
        <div className="content mh4 mv4 w-80-l center-l home"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: page.content.rendered,
          }}
        />
      </Layout>
    );
  }
}

export default PageWrapper(Index);
