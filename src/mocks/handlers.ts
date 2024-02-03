import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('/auth', () => {
    return HttpResponse.json(
      {
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
        userId: 32,
      },
      {
        headers: {
          'Set-Cookie': 'refreshToken=12345--67890',
        },
      },
    );
  }),
  http.get('/hello', () => {
    console.log('refresh 실행');
    // console.log("???", req.cookies);
    // return new HttpResponse(null, { status: 401 });
    return HttpResponse.json(
      {
        NewAccessToken: 'refreshedToken!!!',
      },
      {
        status: 200,
        headers: {
          // NewAccessToken: "refreshedToken!!!",
        },
      },
    );
  }),
  http.post('/logout', () => {
    return HttpResponse.json(null, {
      status: 200,
    });
  }),

  // 테스트
  http.get('/api/users', ({ request, params }) => {
    console.log('request', request);
    console.log('params', params);
    return HttpResponse.json([
      {
        id: 1,
        name: 'Ham',
      },
    ]);
  }),
  // credentials
  http.post('/auth/token', () => {
    console.log('로그인 -> access token 생성');
    return HttpResponse.json(
      {
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
        refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
        expTime: 3600,
        userId: 32,
      },
      {
        headers: {
          'Set-Cookie': 'connect.sid=msw-cookie;HttpOnly;Path=/',
        },
      },
    );
  }),
  http.post('/auth/refresh', () => {
    console.log('refresh token 실행');
    return HttpResponse.json(
      {},
      {
        headers: {
          NewAccessToken: 'Bearer refreshed ---token ,.,..',
        },
      },
    );
  }),
  http.post('/users', async ({ request }) => {
    console.log('회원가입');
    // return HttpResponse.text(JSON.stringify("user_exists"), {
    //   status: 403,
    // });
    return HttpResponse.text(JSON.stringify('ok'), {
      headers: {
        'Set-Cookie': 'connect.sid=msw-cookie;HttpOnly;Path=/;Max-Age=0',
      },
    });
  }),
  http.get('/users/:userId', async ({ request }) => {
    // return HttpResponse.text(JSON.stringify("user_exists"), {
    //   status: 403,
    // });
    console.log('user정보 요청');
    return HttpResponse.json({
      id: 32,
      name: 'John Doe',
      email: 'user@example.com',
      favoriteList: [12, 22, 2, 4, 7, 8, 24, 17],
      created_at: '2024-01-12T02:48:55.040Z',
    });
  }),
  http.patch('/user/updateprofile', async ({ request }) => {
    // 요청 본문(JSON 형식으로 가정)을 파싱합니다.
    const requestBody = await request.json();

    console.log('user정보 수정', requestBody);
    console.log(request);

    // 요청에서 받은 데이터를 그대로 응답 본문에 포함시켜 반환합니다.
    return HttpResponse.json({
      request,
    });
  }),
];
