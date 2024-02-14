import { AiFillFile } from 'react-icons/ai';
import { DiJavascript1, DiReact, DiPython } from 'react-icons/di';
import {
  SiCss3,
  SiHtml5,
  SiJson,
  SiMarkdown,
  SiTypescript,
} from 'react-icons/si';
import { TbBrandCpp } from 'react-icons/tb';
import { LiaJava } from 'react-icons/lia';
export const getFileIcon = (filename: string) => {
  const extension = filename.split('.').pop()?.toLowerCase();

  switch (extension) {
    case 'js':
      return <DiJavascript1 color="#ffdf5d" />; // 더 밝은 노란색
    case 'jsx':
      return <DiReact color="#97dffd" />; // 더 밝은 파란색
    case 'ts':
      return <SiTypescript color="#63b3ed" />; // 밝은 청색
    case 'tsx':
      return <DiReact color="#97dffd" />; // 더 밝은 파란색
    case 'py':
      return <DiPython color="#7fb4e0" />; // 밝은 파랑

    case 'c':
      return <TbBrandCpp color="#b8d3e6" />; // 매우 밝은 청색
    case 'cpp':
      return <TbBrandCpp color="#6a9fb5" />; // 밝은 청색
    case 'html':
      return <SiHtml5 color="#f06529" />; // 밝은 주황색
    case 'css':
      return <SiCss3 color="#66d3fa" />; // 밝은 하늘색
    case 'json':
      return <SiJson color="#b8d3e6" />; // 매우 밝은 청색
    case 'md':
      return <SiMarkdown color="#f06529" />; // 밝은 주황색
    case 'java':
      return <LiaJava color="#f9be76" />; // 밝은 오렌지색
    default:
      return <AiFillFile color="#9ad0ec" />; // 매우 밝은 파란색
  }
};

export const getFileLanguage = (filename: string) => {
  const extension = filename.split('.').pop()?.toLowerCase();

  switch (extension) {
    case 'js':
      return 'JavaScript';
    case 'jsx':
      return 'React JSX';
    case 'ts':
      return 'TypeScript';
    case 'tsx':
      return 'React TypeScript';
    case 'py':
      return 'Python';
    case 'c':
      return 'C';
    case 'cpp':
      return 'C++';
    case 'html':
      return 'HTML';
    case 'css':
      return 'CSS';
    case 'json':
      return 'JSON';
    case 'md':
      return 'Markdown';
    case 'java':
      return 'Java';
    default:
      return 'Unknown';
  }
};
