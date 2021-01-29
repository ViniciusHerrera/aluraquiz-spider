import styled from 'styled-components';
import Head from 'next/head';
import db from '../db.json';
import Widget from '../src/components/Widget'; // O JavaScript se encarrega de procurar o index.js, não precisamos declarar
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizLogo from '../src/components/QuizLogo';

// Otrecho abaixo foi componentizado
// const BackgroundImage = styled.div`
//   background-image: url(${db.bg});
//   flex: 1;
//   background-size: cover;
//   background-position: center;
// `

const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px){
    margin: auto;
    padding: 15px
  }
`;

export default function Home() {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>{db.title}</title>

        <meta property="og:title" content={db.title}/>
        <meta property="og:image" content={db.bg}/>
        <meta property="og:image:type" content="image/jpeg"/>
        <meta property="og:image:width" content="800"/>
        <meta property="og:image:height" content="600"/>
      </Head>

      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>
          <QuizLogo />
          <Widget>
            <Widget.Header>
              <h1>The SpiderMan Quiz</h1>
            </Widget.Header>
            <Widget.Content>
              <p>lorem ipsum dolor sit amet..</p>
            </Widget.Content>
          </Widget>
            
          <Widget>
            <Widget.Content>
              <h1>Quizes da Galera</h1>

              <p>lorem ipsum dolor sit amet..</p>
            </Widget.Content>
          </Widget>
          <Footer />
        </QuizContainer>
        <GitHubCorner projectUrl="https://github.com/ViniciusHerrera"/>
      </QuizBackground>
    </>
  );
}
