/* eslint-disable react/prop-types */
import React from 'react';

// import db from '../../../db.json';
import Widget from '../../components/Widget'; // O JavaScript se encarrega de procurar o index.js, não precisamos declarar
import QuizBackground from '../../components/QuizBackground';
import Button from '../../components/Button';
import QuizLogo from '../../components/QuizLogo';
import QuizContainer from '../../components/QuizContainer';
import AlternativesForm from '../../components/AlternativesForm';
import BackLinkArrow from '../../components/BackLinkArrow';

function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>
        Tela de resultados:
      </Widget.Header>

      <Widget.Content>
        <p>
          Você acertor
          {' '}
          {/* Utilizando o reduce para calculo dos pontos */}
          {/* {results.reduce((somatoriaAtual, resultAtual) => {
            const isAcerto = resultAtual === true;
            if (isAcerto) {
              return somatoriaAtual + 1;
            }
            return somatoriaAtual;
          }, 0)} */}
          {/* Utilizando função Filter para filtrar os true do array e preencher um novo array */}
          {/* Depois pegamos o tamanho desse array qye só tem true */}
          {results.filter((x) => x).length}
          {' '}
          perguntas
        </p>
        <ul>
          {results.map((result, index) => (
            <li key={`result__${result}`}>
              #
              {index + 1}
              {' '}
              Resultado:
              {result === true
                ? ' Acertou'
                : ' Errou'}
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

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

function QuestionWidget({
  question,
  questionIndex,
  totalQuestion,
  onSubmit,
  addResult,
}) {
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
  // Estado para iniciar as seleções dos radiosbuttons
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
  const questionId = `question__${questionIndex}`;
  // Como estamos usando o state, no momento que a tela renderizar novamente atribuiremos
  // o valor verdadeiro ou falso
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;
  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
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

        <AlternativesForm
          onSubmit={(e) => {
            e.preventDefault();
            setIsQuestionSubmited(true);
            setTimeout(() => {
              // O addResult foi passado por referencia e adiciona o valor se for correto
              addResult(isCorrect);
              onSubmit();
              setIsQuestionSubmited(false);
              setSelectedAlternative(undefined);
            }, 3 * 1000);
          }}
        >
          {question.alternatives.map((alternative, alterativeIndex) => {
            const alternativeid = `alternative__${alterativeIndex}`;
            // Atribui o parametro de sucesso ou erro de acordo com o resultado
            const alterativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            // Atribui o status do item selecionado
            const isSelected = selectedAlternative === alterativeIndex;
            /* Faz com que meu componente se coporte como outro */
            return (
              <Widget.Topic
                as="label"
                key={alternativeid}
                htmlFor={alternativeid}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alterativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeid}
                  name={questionId}
                  onChange={() => setSelectedAlternative(alterativeIndex)}
                  type="radio"
                />
                { alternative }
              </Widget.Topic>
            );
          })}

          {/* <pre> Utilizado para debugar a aplicação direto na tela
            {JSON.stringify(question, null, 4)}
          </pre> */}

          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>
          {/* {isQuestionSubmited && isCorrect && <p>Você Acertou!</p>}
          {isQuestionSubmited && !isCorrect && <p>Você Errou!</p>} */}
        </AlternativesForm>

      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage({ externalQuestions, externalBg }) {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  // Iniciando com array vazia
  const [results, setResults] = React.useState([]);
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const totalQuestion = externalQuestions.length;
  const question = externalQuestions[questionIndex];
  const bg = externalBg;

  function addResult(result) {
    // results.push(result); O push não é um hook e o react não atualiza
    setResults([
      ...results, // Pega tudo que tinha
      result, // Adiciona o novo valor
    ]);
  }

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
    <QuizBackground backgroundImage={bg}>
      <QuizContainer>
        <QuizLogo />

        { screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestion={totalQuestion}
            onSubmit={handleSubmit}
            addResult={addResult}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && <ResultWidget results={results} />}
      </QuizContainer>
    </QuizBackground>
  );
}
