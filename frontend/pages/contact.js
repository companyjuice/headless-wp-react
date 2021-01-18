/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, useState } from 'react'
import axios from 'axios'
import Router from 'next/router'
import Link from 'next/link'
import Error from 'next/error'
import WPAPI from 'wpapi'
import Layout from '../components/Layout'
import PageWrapper from '../components/PageWrapper'
import Menu from '../components/Menu'
import Config from '../config'

const wp = new WPAPI({ endpoint: Config.apiUrl })

/** START COMPONENT CLASS */
class Contact extends Component {

  // set default state
  state = {
    status_submitted: false,
    status_submitting: false,
    status_info_error: false, 
    status_info_msg: null,
    inputs_name: '',
    inputs_email: '',
    inputs_phone: '',
    inputs_message: '',
    recaptcha_token: '',
  }
  
  static async getInitialProps(context) {
    //const { slug } = context.query

    // console.log("---------")
    // console.log(process.env)
    // console.log("---------")

    const contactPage = await wp
      .pages()
      .slug('contact')
      .embed()
      .then(data => {
        return data[0]
      })

    return { contactPage }
  }

  /** MM: MAIL */

  handleResponse = (status, msg) => {
    if (status === 200) {
      this.setState({
        status_submitted: true,
        status_submitting: false,
        status_info_error: false, 
        status_info_msg: msg,
      })
      this.setState({
        inputs_name: '',
        inputs_email: '',
        inputs_phone: '',
        inputs_message: '',
      })
    } else {
      this.setState({
        status_info_error: true, 
        status_info_msg: msg,
      })
    }
  }

  handleOnChange = e => {
    e.persist()
    this.setState({
      [e.target.id]: e.target.value
    })
    this.setState({
      status_submitted: false,
      status_submitting: false,
      status_info_error: false, 
      status_info_msg: null,
    })
  }

  handleOnSubmit = async e => {
    e.preventDefault()
    this.setState({
      status_submitting: true 
    })

    const msg = {
      to: 'mcgee.marty@gmail.com', // Change to your recipient
      from: 'marty@companyjuice.com', // Change to your verified sender
      subject: `New Lead Generated from ${this.state.inputs_name}`,
      text: `${this.state.inputs_name} | 
            ${this.state.inputs_email} | 
            ${this.state.inputs_phone} | 
            ${this.state.inputs_message}`,
      html: `<strong>
            ${this.state.inputs_name} | 
            ${this.state.inputs_email} | 
            ${this.state.inputs_phone} | 
            ${this.state.inputs_message}
            </strong>`,
    }

    const res = await fetch('/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(msg)
    })
    const text = await res.text()
    this.handleResponse(res.status, text)
  }
  /** END MAIL */

  render() {
    const { yourname, youremail, yourphone, yourmessage, message } = this.state
    const { contactPage, headerMenu } = this.props
    if (contactPage.length === 0) return <Error statusCode={404} />

    return (
      <Layout>
        <Menu menu={headerMenu} />
        <div className="content login mh4 mv4 w-two-thirds-l center-l">
          <div>
            <h1>{contactPage.title.rendered}</h1>
            <h2>Quick Contact Form</h2>
            <p>For most effective service, please fill out our primary contact form here:</p>
            <p className="message mb3"><strong>{message}</strong></p>
            <article className="pl4 pt3 pr4 pb2 black-80">
              <form onSubmit={this.handleOnSubmit}>
                <label htmlFor="inputs_name" className="f6 b db mb2">Name</label>
                <input
                  id="inputs_name"
                  type="text"
                  onChange={this.handleOnChange}
                  required
                  value={this.state.inputs_name}
                  className="db w-100 pa2 mv3 br6 ba b--silver"
                />
                <label htmlFor="inputs_email" className="f6 b db mb2">Email Address</label>
                <input
                  id="inputs_email"
                  type="email"
                  onChange={this.handleOnChange}
                  required
                  value={this.state.inputs_email}
                  className="db w-100 pa2 mv3 br6 ba b--silver"
                />
                <label htmlFor="inputs_phone" className="f6 b db mb2">Phone Number</label>
                <input
                  id="inputs_phone"
                  type="phone"
                  onChange={this.handleOnChange}
                  required
                  value={this.state.inputs_phone}
                  className="db w-100 pa2 mv3 br6 ba b--silver"
                />
                <label htmlFor="inputs_message" className="f6 b db mb2">Message To Us</label>
                <textarea
                  id="inputs_message"
                  onChange={this.handleOnChange}
                  required
                  value={this.state.inputs_message}
                  className="db w-100 pa2 mv3 br6 ba b--silver"
                />
                {/*<GoogleReCaptcha onVerify={this.handleVerify} />*/}
                {/*<MyComponent />*/}
                <button 
                  type="submit" 
                  disabled={this.state.status_submitting}
                  className="round-btn invert ba bw1 pv2 ph3"
                >
                  {!this.state.status_submitting
                    ? !this.state.status_submitted
                      ? 'Submit Form'
                      : 'Submitted'
                    : 'Submitting...'}
                </button>
              </form>
              {this.state.status_info_error && (
                <div className="error">Error: {this.state.status_info_msg}</div>
              )}
              {!this.state.status_info_error && this.state.status_info_msg && (
                <div className="success">{this.state.status_info_msg}</div>
              )}
            </article>
          </div>
          <div
            className="mv4"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: contactPage.content.rendered,
            }}
          />
        </div>
      </Layout>
    )
  }
}

export default PageWrapper(Contact)
