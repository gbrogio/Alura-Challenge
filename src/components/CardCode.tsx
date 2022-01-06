import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { Container, ButtonAction } from 'styles/components/CardCode';
import { ProjectProps } from 'types';
import {
  CommentIcon,
  HeartIcon,
  ExportIcon,
  EditIcon,
} from 'Icons';
import { useRouter } from 'next/router';
import { dataParams } from 'lib-firebase';
import useAuth from 'useAuth';
import {
  toPng,
  toJpeg,
  toSvg,
} from 'html-to-image';
import TextEditor from './TextEditor';
import InputCp from './Input';

interface props {
  project: ProjectProps;
}

const CardCode: React.FC<props> = ({ project }) => {
  const [comments, setComments] = useState(0);

  const [like, setLike] = useState(0);
  const [hasClick, setClick] = useState(false);

  const { isUser } = useAuth();
  const router = useRouter();

  const usersLikeIncludes = project.usersLike.includes(isUser?.uid);
  const projectInfos = project.pjConfig.infos;
  const projectAuthor = project.pjConfig.author;

  const updateDoc = (fileUpdated: {
    projectLikes: number;
    usersLike: string[];
  }) => dataParams.updateDoc(dataParams.doc(
    dataParams.database,
    'projects',
    project.pid,
  ), fileUpdated);
  const updateData = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setClick(!hasClick);
    updateDoc({
      projectLikes: !usersLikeIncludes
        ? project.projectLikes++ : project.projectLikes--,
      usersLike: [`${!usersLikeIncludes ? project.usersLike?.push(isUser.uid)
        : project.usersLike.splice(project.usersLike.indexOf(isUser.uid), 1)}`],
    });
    if (usersLikeIncludes || !usersLikeIncludes) {
      updateDoc({
        projectLikes: project.projectLikes,
        usersLike: project.usersLike,
      });
    }

    ev.currentTarget.style.opacity = !hasClick ? '1' : '.6';
    setLike(project.projectLikes);
  };

  useEffect(() => setLike(project.projectLikes));

  const ref = useRef<HTMLDivElement>(null);
  const refModal = useRef<HTMLSelectElement>(null);
  const refModalContainer = useRef<HTMLDivElement>(null);

  const downloadProject = useCallback((exportType: 'svg' | 'png' | 'jpg') => {
    const CurrentElement = ref.current;

    if (CurrentElement === null) {
      return;
    }
    CurrentElement.style.height = '100%';
    CurrentElement.style.width = '566px!important';

    const codeElement = (CurrentElement.querySelector('.code') as HTMLElement).classList;
    const codeActions = (CurrentElement.querySelector('.codeActions') as HTMLElement).style;

    codeElement.add('download');
    codeActions.display = 'none';

    function filter(node) {
      return (node.tagName !== 'i');
    }

    const thenDataUrl = (dataUrl) => {
      const link = document.createElement('a');
      link.download = `${projectInfos.projectName}.${exportType}`;
      link.href = dataUrl;
      link.click();

      codeElement.remove('download');
      codeActions.display = 'flex';
      CurrentElement.style.height = 'unset';
      CurrentElement.style.maxWidth = '480px!important';
    };

    if (exportType === 'png') {
      toPng(CurrentElement, { cacheBust: true })
        .then((dataUrl) => {
          thenDataUrl(dataUrl);
        });
    } else if (exportType === 'svg') {
      toSvg(CurrentElement, { filter })
        .then((dataUrl) => {
          thenDataUrl(dataUrl);
        });
    } else if (exportType === 'jpg') {
      toJpeg(CurrentElement, { quality: 0.95 })
        .then((dataUrl) => {
          thenDataUrl(dataUrl);
        });
    }
  }, [ref]);

  return (
    <Container ref={ref} id="cardProject" key={project.pid}>
      <section className="code">
        <TextEditor
          childrenTextData={projectInfos.projectContent}
          color={projectInfos.projectColor}
          language={projectInfos.projectLanguage}
          disabled
        />
      </section>

      <section className="codeActions">
        <ButtonAction
          type="button"
          onClick={(ev) => {
            const currentDisplay = refModalContainer.current.style.display;

            refModalContainer.current.style.display = 'block';
            (ev.currentTarget.parentNode as HTMLElement)
              .style.bottom = currentDisplay === 'block' ? '6.5rem' : '7.8rem';
            refModalContainer.current.style.transform = 'scale(1)';
          }}
        >
          <div
            className="modalSave"
            ref={refModalContainer}
            style={{
              display: 'none',
              marginRight: '1rem',
            }}
          >
            <InputCp
              isType="select"
              iD="exportType"
              ref={refModal}
              onChange={(ev) => {
                const { value } = ev.currentTarget as HTMLSelectElement;

                if (value !== 'none') {
                  downloadProject(value as ('svg' | 'jpg' | 'png'));
                }
              }}
              style={{
                width: '100%',
              }}
            >
              <option value="none">Tipo de Arquivo</option>
              <option value="png">PNG</option>
              <option value="svg">SVG</option>
              <option value="jpg">JPG</option>
            </InputCp>
          </div>
          <ExportIcon />
        </ButtonAction>
        {projectAuthor.userId === isUser?.uid && (
          <>
            <div className="verticalLine" />
            <ButtonAction
              type="button"
              onClick={() => {
                router.push(`/?=update-${project.pid}`);
              }}
            >
              <EditIcon />
            </ButtonAction>
          </>
        )}

      </section>

      <section className="projectDesc">
        <h1 style={{
          fontStyle: 'normal',
          fontWeight: 'bold',
          fontSize: '21px',
          lineHeight: '31px',
        }}
        >
          {projectInfos.projectName}
        </h1>
        <p style={{
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontSize: '16px',
          lineHeight: '24px',
          opacity: '0.8',
        }}
        >
          {projectInfos.projectDescription}
        </p>
      </section>
      <section className="cardActions">
        <div className="actions">
          <ButtonAction
            type="button"
          >
            <CommentIcon />
            <p>{comments}</p>
          </ButtonAction>
          <ButtonAction
            style={{ marginLeft: '1rem' }}
            type="button"
            onClick={(ev) => (isUser ? updateData(ev) : alert('Por favor, faça o login para curtir/comentar algum projeto'))}
          >
            <HeartIcon style={{
              fill: usersLikeIncludes
                ? 'rgb(var(--Red))' : 'white',
            }}
            />
            <p>{like}</p>
          </ButtonAction>
        </div>
        <div className="user">
          <img src={projectAuthor.userPhoto} alt="" />
          <p>{projectAuthor.userName}</p>
        </div>
      </section>
    </Container>
  );
};

export default CardCode;
