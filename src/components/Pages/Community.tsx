/* eslint radix: off, no-unreachable-loop: off */

import React, { useEffect, useState } from 'react';
import { Container } from 'styles/pages';
import { SadGuyIcon } from 'Icons';
import { dataParams } from 'lib-firebase';

import CardCode from '../CardCode';

export const CommunityCp = () => {
  const allProjects = [];
  const [isProjects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const docSnap = await dataParams.getDocs(dataParams.collection(dataParams.database, 'projects'));
      docSnap.forEach((doc) => {
        if (!doc.data().first) {
          allProjects.push(doc.data());
        }
      });
      setProjects(allProjects);
    };
    fetchData();
  });

  return (
    <Container>
      <section
        id="projectsContent"
        className="projectsContent"
      >
        {isProjects.map((project) => <CardCode project={project} />)}
        {isProjects.length === 0 && (
          <div
            style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              textAlign: 'center',
              paddingTop: '6.5%',
              display: 'block',
            }}
            className="message"
          >
            <p>Ops!.. Nada por Aqui, volte mais tarde!</p>
            <SadGuyIcon />
          </div>
        )}

      </section>
    </Container>
  );
};
