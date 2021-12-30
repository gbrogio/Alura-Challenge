/* eslint @typescript-eslint/no-explicit-any: off */

import React, { ReactElement } from 'react';
import { useRouter } from 'next/router';

import { Container } from 'styles/components/LinkNav';

interface props {
  icon: ReactElement<any, any>;
  hRef: string;
}

const LinkNav: React.FC<props> = ({ icon, children, hRef }) => {
  const router = useRouter();

  return (
    <Container href={`${hRef}`} className={router.pathname === `${hRef}` ? 'activeLink' : ''}>
      <div>{icon}</div>
      <p>{children}</p>
    </Container>
  );
};
export default LinkNav;
