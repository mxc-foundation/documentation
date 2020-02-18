/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

class Footer extends React.Component {
  docUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    const docsUrl = this.props.config.docsUrl;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    return `${baseUrl}${docsPart}${langPart}${doc}`;
  }

  pageUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + (language ? `${language}/` : '') + doc;
  }

  render() {
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <a href={this.props.config.baseUrl} className="nav-home">
            {this.props.config.footerIcon && (
              <img
                src={this.props.config.baseUrl + this.props.config.footerIcon}
                alt={this.props.config.title}
                width="66"
                height="58"
              />
            )}
          </a>
          <div>
            <h5>Docs</h5>
            <a href={this.docUrl('startingDev.html', this.props.language)}>
              Getting Started for Developers
            </a>
            <a href={this.docUrl('startingUser.html', this.props.language)}>
              Getting Started for Users
            </a>
          </div>
          <div>
            <h5>Community</h5>
            <a href={this.props.config.chatUrlDiscordDevelopers}
              target="_blank"
              rel="noreferrer noopener">
              Developers on Discord
            </a>
            <a
              href={this.props.config.chatUrlDiscordDevelopers}
              target="_blank"
              rel="noreferrer noopener">
              Users on Discord
            </a>
            <a href="https://t.me/mxcfoundation">Project Chat</a>
            <a
              href="https://twitter.com/mxcfoundation"
              target="_blank"
              rel="noreferrer noopener">
              Twitter
            </a>
          </div>
          <div>
            <h5>More</h5>
            <a href="https://github.com/orgs/mxc-foundation/">GitHub</a>
            <a
              className="github-button"
              href={`${this.props.config.baseUrlGithub}/lpwan-app-server`}
              data-icon="octicon-star"
              data-count-href="/mxc-foundation/lpwan-app-server"
              data-show-count="true"
              data-count-aria-label="# MXC on GitHub"
              aria-label="Star this project on GitHub">
              Star
            </a>
            {this.props.config.twitterUsername && (
              <div className="social">
                <a
                  href={`https://twitter.com/${this.props.config.twitterUsername}`}
                  className="twitter-follow-button">
                  Follow @{this.props.config.twitterUsername}
                </a>
              </div>
            )}
          </div>
        </section>

        <section className="copyright">{this.props.config.copyright}</section>
      </footer>
    );
  }
}

module.exports = Footer;
