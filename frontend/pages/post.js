import React, { Component } from 'react';
import Error from 'next/error';
import Menu from '../components/Menu';
import WPAPI from 'wpapi';
import Layout from '../components/Layout';
import PageWrapper from '../components/PageWrapper';
import Config from '../config';

//import WPGBlocks from '../src/js/react-gutenberg-master';

import {Div, H1} from '../src/js/tachyons-styled-react-master/src/elements';


// "@wordpress/components": "^12.0.1",   
// import { Button } from '@wordpress/components';

// const Example = () => (
//   <Button isDefault>
//     Click me!
//   </Button>
// )

const wp = new WPAPI({ endpoint: Config.apiUrl });

class Post extends Component {
  static async getInitialProps(context) {
    const { slug, apiRoute } = context.query;

    let apiMethod;

    switch (apiRoute) {
      case 'category':
        apiMethod = wp.categories();
        break;
      case 'page':
        apiMethod = wp.pages();
        break;
      case 'portfolio':
        apiMethod = wp.types().type('portfolio');
        break;
      default:
        apiMethod = wp.posts();
        break;
    }

    const post = await apiMethod
      .slug(slug)
      .embed()
      .then(data => {
        return data[0];
      });

    return { post };
  }

  render() {

    const { post, headerMenu } = this.props;

    console.log("------------------");
    console.log("post--------------");
    console.log(post);
    console.log("------------------");
    console.log("headerMenu--------");
    console.log(headerMenu);
    console.log("------------------");

    if (!post.title) {
      return <Error statusCode={404} />;
    }

    const heroUrl = (
      post._embedded &&
      post._embedded['wp:featuredmedia'] &&
      post._embedded['wp:featuredmedia'][0] &&
      post._embedded['wp:featuredmedia'][0].source_url
    ) ? post._embedded['wp:featuredmedia'][0].source_url : false;

    return (
      <Layout className="test">
        <Menu menu={headerMenu} />
        {heroUrl ? (
          <div className={`hero flex items-center post-type-${post.type}`}>
            <img
              className="w-100"
              src={heroUrl}
            />
          </div>
        ) : ''}
        <div className={`content mh4 mv4 w-two-thirds-l center-l post-${post.id} post-type-${post.type}`}>
          <h1>{post.title.rendered}</h1>
          {/*<Example />*/}
          {/*<WPGBlocks blocks={post.blocks} />*/}
          <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: post.content.rendered,
            }}
          />
        </div>
      </Layout>
    );
  }
}

export default PageWrapper(Post);
