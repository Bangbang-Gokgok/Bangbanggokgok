import { Request, Response, NextFunction } from 'express';

// 에러 미들웨어는 항상 (설령 안 쓰더라도)
// error~next의 4개 인자를 설정해 주어야 함.
function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
  // 터미널에 노란색으로 출력됨.
  console.log('\x1b[33m%s\x1b[0m', error.stack);
  // 에러 이름으로 status code를 설정
  switch (error.name) {
    case 'Unauthorized':
      res.status(401);
      break;
    case 'Forbidden':
      res.status(403);
      break;
    case 'NotFound':
      res.status(404);
      break;
    case 'Conflict':
      res.status(409);
      break;
    default:
      res.status(400);
  }
  // 에러는 JSON 형태로 프론트에 전달됨
  res.json({ result: 'error', reason: error.message });
}

export { errorHandler };
