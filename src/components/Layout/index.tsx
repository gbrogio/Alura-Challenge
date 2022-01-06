import React, { useEffect, useState } from 'react';
import { Main, Header, LeftGroup } from 'styles/pages';
import {
  AluraDev,
  CodeIcon,
  CommunityIcon,
  MenuIcon,
} from 'Icons';

import { Title3 } from 'styles/components/Text';
import useAuth from 'useAuth';
import SignUser from '../SignUser';
import LinkNav from '../LinkNav';

import InputCp from '../Input';

const LayoutCp: React.FC = ({ children }) => {
  const [isWidth, setWidth] = useState(0);
  const [menuCheck, setMenuCheck] = useState(false);
  const {
    isUser,
    signInGoogle,
    deleteAccount,
    signOut,
  } = useAuth();

  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
      document.body.style.overflow = menuCheck && window.innerWidth <= 425 ? 'hidden' : 'auto';
    });
  }, []);

  const logoElement = <section className="logo"><AluraDev /></section>;
  const searchElement = (
    <InputCp isWidth={isWidth} isType="search" placeHolder="Busque por: @usuário" />
  );
  const signUserElement = (
    <SignUser
      isSign={!!isUser}
      userName={isUser?.name === null ? isUser?.screenName : isUser?.name}
      userPhoto={isUser?.photo}
      deleteAccount={deleteAccount}
      signOut={signOut}
      isWidth={isWidth}
      onClick={() => {
        signInGoogle();
      }}
    />
  );
  const navLinks = (
    <>
      <LinkNav hRef="/" icon={(<CodeIcon />)}>Editor de código</LinkNav>
      <LinkNav hRef="/comunidade" icon={(<CommunityIcon />)}>Comunidade</LinkNav>
    </>
  );

  return (
    <>
      <Header style={{ overflow: isWidth < 317 ? 'scroll' : 'hidden' }}>
        {isWidth > 768 ? (
          <menu className="topGroup">
            {logoElement}

            <section className="searchBar">
              {searchElement}
            </section>
            <section className="sign">
              {signUserElement}
            </section>
          </menu>
        ) : (
          <menu className="topGroup">
            {logoElement}
            <input type="checkbox" id="menuCheck" className="invisible" />
            <section className="searchBar">
              {searchElement}
            </section>
            <MenuIcon htmlFor="menuCheck" onClick={() => setMenuCheck(!menuCheck)}>
              <span className="MenuIcon__line" style={{ marginRight: isWidth < 317 ? '2rem' : '0' }} />
            </MenuIcon>

            <section className="navigationRight">
              {navLinks}
              <span className="line" />
              <section className="sign">
                {signUserElement}
              </section>
            </section>
          </menu>
        )}
      </Header>

      <Main role="main" id="Content" aria-label="Conteúdo principal pressione tab para prosseguir">
        {isWidth >= 768 && (
          <LeftGroup>
            <Title3>Menu</Title3>
            {navLinks}
          </LeftGroup>
        )}
        {children}
      </Main>
    </>
  );
};

export default LayoutCp;
