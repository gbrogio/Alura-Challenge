import React, { useState } from 'react';
import { GithubIcon, SignOutIcon, DeleteAccountIcon } from 'Icons';
import { ButtonFilled } from 'styles/components/Buttons';
import { Container } from 'styles/components/SignUser';
import { SignElementProps } from 'types';

const SignUser: React.FC<SignElementProps> = ({
  isSign,
  userPhoto,
  userName,
  onClick,
  signOut,
  deleteAccount,
  isWidth,
}) => {
  const [hasClick, setClick] = useState(false);

  return (
    <Container>
      {isSign ? (
        <>
          <section
            className="signed"
            role="button"
            tabIndex={0}
            onClick={() => setClick(!hasClick)}
          >
            <img src={userPhoto} alt="" />
            <p>{userName?.split(' ')[0]}</p>
          </section>
          <div
            className="userMethsModal"
            style={{
              animation: hasClick || isWidth < 768 ? 'animOpen .8s ease-in-out forwards' : 'animClose .8s ease-in-out forwards',
            }}
          >
            <ButtonFilled
              type="button"
              onClick={signOut}
              style={{
                margin: '.125rem 0',
                padding: '.5rem 1rem',
                textAlign: 'left',
                justifyContent: 'space-between',
              }}
            >
              <SignOutIcon style={{ marginRight: '1rem' }} />
              <p>Sair da Conta</p>
            </ButtonFilled>
            <ButtonFilled
              type="button"
              onClick={deleteAccount}
              style={{
                margin: '.125rem 0',
                padding: '.5rem 1rem',
                textAlign: 'left',
                justifyContent: 'space-between',
              }}
            >
              <DeleteAccountIcon style={{ marginRight: '1rem' }} />
              <p>Deletar a Conta</p>
            </ButtonFilled>
          </div>
        </>
      ) : (
        <section className="notSing" style={{ display: 'flex', justifyContent: 'center' }}>
          <ButtonFilled
            type="button"
            id="loginGithub"
            onClick={onClick}
            style={{
              margin: '0 0 0 .5rem',
              padding: '1rem 2rem',
            }}
          >
            <GithubIcon style={{ marginRight: '1rem' }} />
            <p>Entrar com Github</p>
          </ButtonFilled>
        </section>
      )}
    </Container>
  );
};

export default SignUser;
