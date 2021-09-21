import React, { memo, FC } from 'react';

import Styles from './footer-styles.scss';

const Footer: FC = () => <footer className={Styles.footer} />;

export default memo(Footer);
