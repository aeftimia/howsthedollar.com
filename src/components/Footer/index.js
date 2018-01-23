import React from 'react';
import { ShareButtons, generateShareIcon } from 'react-share';

import logo from './assets/logo.svg';
import './index.css';

const {
  FacebookShareButton,
  GooglePlusShareButton,
  TwitterShareButton,
  RedditShareButton,
} = ShareButtons;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const GooglePlusIcon = generateShareIcon('google');
const RedditIcon = generateShareIcon('reddit');

const shareUrl = 'https://howsthedollar.com';
const title = 'How\'s The Dollar?';

const Footer = () => (
  <div className="Footer">
    <span>Powered by </span>
    <a
      href="https://www.usa.gov"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src={logo}
        className="logo"
        alt="Fuck yeah"
      />
    </a>
    <div />
    <TwitterShareButton
      url={shareUrl}
      title={title}
      className="share share-button"
    >
      <TwitterIcon size={32} round />
    </TwitterShareButton>
    <FacebookShareButton
      url={shareUrl}
      title={title}
      className="share share-button"
    >
      <FacebookIcon size={32} round />
    </FacebookShareButton>
    <RedditShareButton
      url={shareUrl}
      title={title}
      className="share share-button"
    >
      <RedditIcon size={32} round />
    </RedditShareButton>
    <GooglePlusShareButton
      url={shareUrl}
      title={title}
      className="share share-button"
    >
      <GooglePlusIcon size={32} round />
    </GooglePlusShareButton>
  </div>
);

export default Footer;

