import { AiFillFile } from 'react-icons/ai';
import { DiReact, DiPython } from 'react-icons/di';
import {
  SiCss3,
  SiHtml5,
  SiJavascript,
  SiMarkdown,
  SiTypescript,
} from 'react-icons/si';
import { TbBrandCpp } from 'react-icons/tb';
import { LiaJava } from 'react-icons/lia';
import { FaNpm } from 'react-icons/fa6';
export const getFileIcon = (filename: string) => {
  const extension = filename.split('.').pop()?.toLowerCase();

  switch (extension) {
    case 'js':
      return <SiJavascript color="#f0db4f" />; // 진한 노란색
    case 'jsx':
      return <DiReact color="#61DBFB" />; // 진한 파란색
    case 'ts':
      return <SiTypescript color="#3178c6" />; // 진한 청색
    case 'tsx':
      return <DiReact color="#61DBFB" />; // 진한 파란색
    case 'py':
      return <DiPython color="#3776AB" />; // 진한 파랑

    case 'c':
      return <TbBrandCpp color="#00599C" />; // 진한 청색
    case 'cpp':
      return <TbBrandCpp color="#004482" />; // 진한 청색
    case 'html':
      return <SiHtml5 color="#E34F26" />; // 진한 주황색
    case 'css':
      return <SiCss3 color="#1572B6" />; // 진한 하늘색
    case 'json':
      return <FaNpm color="#CB3837" />; // 진한 빨간색
    case 'md':
      return <SiMarkdown color="#715537" />; // 검은색
    case 'java':
      return <LiaJava color="#f89820" />; // 진한 오렌지색
    default:
      return <AiFillFile color="#6c757d" />; // 진한 회색
  }
};

export const getFileLanguage = (filename: string) => {
  const extension = filename.split('.').pop()?.toLowerCase();

  switch (extension) {
    case 'js':
      return 'javaScript';
    case 'jsx':
      return 'React JSX';
    case 'ts':
      return 'typeScript';
    case 'tsx':
      return 'React TypeScript';
    case 'py':
      return 'python';
    case 'c':
      return 'c';
    case 'cpp':
      return 'c++';
    case 'html':
      return 'html';
    case 'css':
      return 'css';
    case 'json':
      return 'json';
    case 'md':
      return 'markdown';
    case 'java':
      return 'java';
    default:
      return 'Unknown';
  }
};
