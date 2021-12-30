/* eslint radix: off */

import React, { useEffect, useState } from 'react';
import { Title3 } from 'styles/components/Text';
import { ButtonOutlined, ButtonFilled } from 'styles/components/Buttons';
import { Container } from 'styles/pages';
import { useRouter } from 'next/router';
import useAuth from 'useAuth';
import { dataParams } from 'lib-firebase';
import { ProjectProps } from 'types';
import { DeleteIcon } from 'Icons';
import TextEditor from '../TextEditor';
import InputCp from '../Input';

export const HomeCp = () => {
  const [colorBg, setColorBg] = useState('');
  const [language, setLanguage] = useState('text');
  const [haveClick, setClick] = useState(false);
  const { isUser } = useAuth();
  const router = useRouter();
  const routerUpdate = router.asPath?.includes('/?=update');
  const routerId = router.asPath?.split('-')[1];

  const ViewHighlight = 'Visualizar com o highlight';
  const DisableHighlight = 'Desativar o highlight';
  const errDbPushFiles = 'Ops... Nosso Banco de dados não está recebendo projetos, volte mais tarde e tente novamente ;-;';

  const verifyUser = async () => {
    if (routerUpdate) {
      const id = routerId;
      const docSnapUser = await dataParams.getDoc(dataParams.doc(dataParams.database, 'users', isUser?.uid));
      if (!docSnapUser.data().projects.includes(id)) {
        router.push('/404');
        return false;
      }
      return true;
    }
  };
  const setViewHighlight = () => {
    const selectLanguage = document.getElementById('selectLanguage') as HTMLSelectElement;
    setLanguage(language === 'text' ? selectLanguage.value : 'text');

    if (selectLanguage.value === 'text') {
      setClick(false);
    } else {
      setClick(!haveClick);
    }
  };
  const newId = (count) => {
    const caracteres = 'abcdefghijklmnopqrstuvwxyz1234567890';
    let str = '';
    for (let i = 0; i < count; i++) {
      const toInt = Math.random() * (caracteres.length);
      str += caracteres[parseInt(`${toInt}`)];
    }
    return str;
  };
  const setDoc = (isProjects: any[]) => {
    dataParams.setDoc(dataParams.doc(
      dataParams.database,
      'users',
      isUser.uid,
    ), {
      projects: isProjects,
    });
  };
  const userData = async (id: string) => {
    const allProjects = [];
    const docRefUser = dataParams.doc(dataParams.database, 'users', isUser.uid);
    const docSnapUser = await dataParams.getDoc(docRefUser);

    if (docSnapUser.exists()) {
      for (let i = 0; i < docSnapUser.data().projects.length; i++) {
        allProjects.push(docSnapUser.data().projects[i]);
      }
      allProjects.push(id);

      setDoc(allProjects);
    } else {
      setDoc([id]);
    }
    alert('O seu projeto foi salvo com sucesso');
  };

  const docRefProject = (id) => dataParams.doc(dataParams.database, 'projects', id);
  const getDocProject = () => dataParams.getDoc(docRefProject(routerId));

  const projectData = async () => {
    const docSnapData = await getDocProject();
    const data = await docSnapData.data() as ProjectProps;

    return { docSnapData, data };
  };
  const saveProject = async (
    name: HTMLInputElement,
    color: string | HTMLInputElement,
    description: HTMLTextAreaElement,
    content: HTMLTextAreaElement,
    update: boolean,
  ) => {
    const pjConfig = {
      infos: {
        projectName: name.value,
        projectDescription: description.value,
        projectContent: content.value,
        projectLanguage: language,
        projectColor: colorBg || (color as HTMLInputElement).value,
      },
      author: {
        userId: isUser.uid,
        userPhoto: isUser.photo,
        userName: `@${isUser.name?.split(' ')[0].toLowerCase() || isUser.screenName}`,
      },
    };
    const result = (keyWord: string) => window.confirm(`Deseja ${keyWord} o projeto?`);

    if (update) {
      if (result('atualizar')) {
        const { data } = await projectData();
        if (data.pjConfig.author.userId === isUser.uid) {
          userData(routerId);
          const updateProjectData = async () => {
            await dataParams.updateDoc(docRefProject(routerId), {
              pid: routerId,
              pjConfig,
              projectLikes: data.projectLikes,
              projectComments: data.projectComments,
              usersLike: data.usersLike,
            }).then(() => {
              alert('seu projeto foi atualizado com sucesso');
            }).catch(() => {
              alert(errDbPushFiles);
            });
          };
          updateProjectData();
        }
      }
    } else if (result('salvar')) {
      const id = docRefProject(newId(10)) ? newId(11)
        : newId(10);
      userData(id);
      const setNewProjectInData = async () => {
        const docRefPj = docRefProject(id);
        await dataParams.setDoc(docRefPj, {
          pid: id,
          pjConfig,
          projectLikes: 0,
          projectComments: 0,
          usersLike: [],
        }).then(() => {
          alert('seu projeto foi salvo com sucesso');
        }).catch(() => {
          alert(errDbPushFiles);
        });
      };
      setNewProjectInData();
    }
  };

  useEffect(() => {
    const color = document.querySelector('input[type="color"]') as HTMLInputElement;
    if (routerUpdate) {
      const name = document.getElementById('pjName') as HTMLInputElement;
      const description = document.getElementById('pjDesc') as HTMLTextAreaElement;
      const content = document.getElementById('textContent') as HTMLTextAreaElement;
      const selectLanguage = document.getElementById('selectLanguage') as HTMLSelectElement;

      const changeValues = async () => {
        const { data } = await projectData();
        const dataInfos = data.pjConfig.infos;

        name.value = dataInfos.projectName;
        description.value = dataInfos.projectDescription;
        content.value = dataInfos.projectContent;
        color.value = dataInfos.projectColor;
        selectLanguage.value = dataInfos.projectLanguage;
        setLanguage(dataInfos.projectLanguage);
      };
      changeValues();
    }

    color.defaultValue = '#68D1FF';
    setColorBg(color.defaultValue);
    color.addEventListener('input', () => {
      setColorBg(color.value);
    });
  }, []);
  useEffect(() => {
    const selectLanguage = document.getElementById('selectLanguage') as HTMLSelectElement;
    const setHighlight = document.getElementById('setHighlight') as HTMLButtonElement;

    selectLanguage.addEventListener('change', (ev) => {
      setLanguage((ev.currentTarget as HTMLSelectElement).value);
    });

    if (selectLanguage.value === 'text') {
      setHighlight.textContent = 'Selecione uma linguagem';
      setLanguage('text');
    } else {
      setHighlight.textContent = haveClick ? ViewHighlight : DisableHighlight;
    }
  });

  return verifyUser() && (
    <Container>
      <form>
        <section className="editor">
          <TextEditor
            language={language}
            color={colorBg}
            disabled={false}
          />

          <ButtonOutlined
            type="button"
            id="setHighlight"
            style={{
              width: '100%',
              margin: '1rem 0',
            }}
            onClick={() => {
              setViewHighlight();
            }}
          />
        </section>
        <section className="description">
          <Title3>Seu Projeto</Title3>
          <InputCp iD="pjName" isType="text" placeHolder="Nome do Projeto" required />
          <InputCp
            required
            iD="pjDesc"
            isType="description"
            placeHolder="Descrição do seu Projeto"
            style={{ height: '110px' }}
          />

          <Title3 style={{ marginTop: '2rem' }}>Personalização</Title3>
          <section className="languageColor">
            <InputCp
              iD="selectLanguage"
              isType="select"
            >
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="html">HTML</option>
              <option value="css">CSS</option>
            </InputCp>

            <InputCp isType="color" />

          </section>
          <ButtonFilled
            id="submitBtn"
            type="submit"
            style={{ width: '100%', margin: '1rem 0' }}
            onClick={(ev) => {
              const name = document.getElementById('pjName') as HTMLInputElement;
              const description = document.getElementById('pjDesc') as HTMLTextAreaElement;
              const content = document.getElementById('textContent') as HTMLTextAreaElement;
              const loginGithub = document.getElementById('loginGithub') as HTMLButtonElement;

              if (isUser) {
                if (name.validity.valid && description.validity.valid && content.validity.valid) {
                  ev.preventDefault();
                  if (routerUpdate) {
                    saveProject(name, colorBg, description, content, true);
                  } else {
                    saveProject(name, colorBg, description, content, false);
                  }
                }
              } else {
                alert('Ops... Faça o seu login para publicar algum projeto');
                loginGithub?.focus();
                ev.preventDefault();
              }
            }}
          >
            Salvar projeto
          </ButtonFilled>
          {routerUpdate && (
            <>
              <ButtonFilled
                id="submitBtn"
                type="button"
                className="delete"
                style={{
                  width: '100%',
                  margin: '1rem 0',
                }}
                onClick={() => {
                  const result = window.confirm('Deseja deletar o projeto');
                  if (result) {
                    dataParams.deleteDoc(docRefProject(routerId)).then(() => {
                      alert('seu projeto foi deletado com sucesso');
                    }).catch(() => {
                      alert('Ops.. Nosso banco de dados não está aceitando alterações no momento, tente novamente mais tarde!');
                    });
                  }
                  router.push('/comunidade');
                }}
              >
                <DeleteIcon />
                Deletar projeto
              </ButtonFilled>
              <div style={{
                padding: '3rem 0',
              }}
              />
            </>
          )}
        </section>
      </form>
    </Container>
  );
};
