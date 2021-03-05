import db from '../../db.json';

// Lambda Server que tem uma função que recebe um request
// e retorna um response
export default function dbHandler(request, response) {
  // tornando a Api publica
  if (request.method === 'OPTIONS') {
    response.status(200).end();
    return;
  }

  response.setHeader('Access-Control-Allow-Credentials', true);
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');

  response.json(db);
}
