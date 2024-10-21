import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import ProfileBlock from './ProfileBlock';

class ProfileManagement extends React.Component {
  render() {
    const title = brand.name + 'User Account';
    const description = brand.desc;
    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <PapperBlock title="User Account" icon="ion-md-person" noMargin overflowX>
          <ProfileBlock />
        </PapperBlock>
      </div>
    );
  }
}

export default ProfileManagement;
