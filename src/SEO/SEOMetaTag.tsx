import { Helmet } from 'react-helmet-async';

interface ISEOMetaTagProps {
  title?: string;
  keywords?: string;
  description?: string;
  url: string;
}

const SEOMetaTag = (props: ISEOMetaTagProps) => {
  const description = props.description
    ? props.description
    : '누구나, 언제, 어디서든 코딩 지식을 공유하는 실시간 IDE 기반 커뮤니티 플랫폼, EVERYIDE';
  const imageSrc = '../assets/images/ogImage.png';
  const title = props.title ? props.title : 'EVERYIDE - Welcome!';
  const keywords = props.keywords
    ? `everyide, web, IDE, 코딩, 스터디, 독학, 개발자, 실시간, 동시편집, ${props.keywords}`
    : 'everyide, web, IDE, 코딩, 스터디, 독학, 개발자, 실시간, 동시편집,';

  return (
    <Helmet>
      <title>{title}</title>

      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={props.url} />
      <meta property="og:title" content={title} />
      <meta property="og:image" content={imageSrc} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={title} />
      <meta property="og:locale" content="ko_KR" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageSrc} />
    </Helmet>
  );
};

export default SEOMetaTag;
