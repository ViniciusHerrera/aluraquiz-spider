/* eslint-disable react/prop-types */
import React from 'react';

import db from '../db.json';
import Widget from '../src/components/Widget'; // O JavaScript se encarrega de procurar o index.js, não precisamos declarar
import QuizBackground from '../src/components/QuizBackground';
import Button from '../src/components/Button';
import QuizLogo from '../src/components/QuizLogo';
import QuizContainer from '../src/components/QuizContainer';

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        [Desafio Loading]
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({ question, questionIndex, totalQuestion, onSubmit }) {
  const questionId = `question__${questionIndex}`;
  return (
    <Widget>
      <Widget.Header>
        {/* <BackLinkArrow href="/" /> */}
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestion}`}
        </h3>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          {question.alternatives.map((alternative, alterativeIndex) => {
            const alternativeid = `alternative__${alterativeIndex}`;
            /* Faz com que meu componente se coporte como outro */
            return (
              <Widget.Topic
                as="label"
                htmlFor={alternativeid}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeid}
                  name={questionId}
                  type="radio"
                />
                { alternative }
              </Widget.Topic>
            );
          })}

          {/* <pre> Utilizado para debugar a aplicação direto na tela
            {JSON.stringify(question, null, 4)}
          </pre> */}

          <Button type="submit">
            Confirmar
          </Button>

          <p>Você Acertou!</p>
          <p>Você Errou!</p>
        </form>

      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage() {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const totalQuestion = db.questions.length;
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const question = db.questions[questionIndex];

  // [React chama de: Effects]
  // FORMA ANTIGA QUANDO USAVA CLASSES
  // nasce === didMount
  // atualizado === willUpdate
  // morre === willUnmont
  // FORMA NOVA:
  // React.useEffect

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
    // nasce === didMount -> Roda função se o valor da chave mudar
  }, []);

  function handleSubmit() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestion) {
      setQuestionIndex(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />

        { screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestion={totalQuestion}
            onSubmit={handleSubmit}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && <div>Você acertor X questões, parabéns!</div>}
      </QuizContainer>
    </QuizBackground>
  );
}
