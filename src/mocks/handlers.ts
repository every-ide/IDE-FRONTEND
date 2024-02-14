import { http, HttpResponse } from 'msw';

export const handlers = [
  // login API
  http.post('/auth', () => {
    return HttpResponse.json(
      {
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
        userId: 32,
        email: 'test@test.com',
      },
      {
        headers: {
          'Set-Cookie': 'refreshToken=12345--67890',
        },
      },
    );
  }),
  // Access token refresh
  http.get('/hello', () => {
    console.log('refresh 실행');
    // console.log("???", req.cookies);
    // return new HttpResponse(null, { status: 401 });
    return HttpResponse.json(
      {
        // NewAccessToken: 'refreshedToken!!!',
      },
      {
        status: 200,
        headers: {
          NewAccessToken: 'refreshedToken!!!',
        },
      },
    );
  }),
  http.get('/user/info', () => {
    console.log('user info 실행');
    return HttpResponse.json({
      email: 'test@mail.com',
      name: 'Goorm',
      userId: 12,
    });
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

  // 🪐 GET: 전체 컨테이너 목록 조회
  http.get('api/:userId/containers', () => {
    return HttpResponse.json(
      [
        {
          name: '1-container',
          description:
            'new container for my toy project hahahahahahhhahahahahahahahahahahahahah!',
          active: true,
          createDate: '2024-02-13T15:38:18.151331',
          lastModifiedDate: '2024-02-13T15:38:18.151331',
          language: 'java',
        },
        {
          name: '2-container',
          description: 'new container for my toy project !',
          active: true,
          createDate: '2024-02-13T15:38:23.250293',
          lastModifiedDate: '2024-02-13T15:38:23.250293',
          language: 'javascript',
        },
        {
          name: '3-container',
          description: 'new container for my toy project !',
          active: true,
          createDate: '2024-02-13T15:38:26.031045',
          lastModifiedDate: '2024-02-13T15:38:26.031045',
          language: 'python',
        },
        {
          name: 'Container 4',
          description: 'new container for my toy project !',
          active: false,
          createDate: '2024-02-13T15:38:23.250293',
          lastModifiedDate: '2024-02-13T15:38:23.250293',
          language: 'javascript',
        },
        {
          name: 'Container 5',
          description: 'new container for my toy project !',
          active: true,
          createDate: '2024-02-13T15:38:23.250293',
          lastModifiedDate: '2024-02-13T15:38:23.250293',
          language: 'java',
        },
        {
          name: 'Container 6',
          description: 'new container for my toy project !',
          active: false,
          createDate: '2024-02-13T15:38:23.250293',
          lastModifiedDate: '2024-02-13T15:38:23.250293',
          language: 'python',
        },
      ],
      {
        status: 200,
      },
    );
  }),

  // 🪐 POST: 새로운 컨테이너 생성
  // request body 에시
  // {
  //   "email" : "kms@goorm.io",
  //   "name" : "first-container",
  //   "description" : "new container for my toy project !"
  // }
  http.post('/api/containers', async ({ request }) => {
    const reqData = await request.json();
    console.log('params', reqData);
    return HttpResponse.json(null, {
      status: 200,
    });
  }),
  // 🪐 PATCH: 컨테이너 정보 수정
  // request body 에시
  // {
  //   "email" : "kms@goorm.io",
  //   "oldName" : "first-container",
  //   "newName" : "second-container",
  //   "newDescription" : "Modify container for my toy project !",
  //   "active" : true
  // }
  http.patch('/api/containers', async ({ request }) => {
    const reqData = await request.json();
    console.log('params', reqData);
    return HttpResponse.json(null, {
      status: 200,
    });
  }),

  // 🪐 DELETE: 컨테이너 삭제
  // request body 에시
  // {
  //   "email" : "kms@goorm.io",
  //   "name" : "second-container"
  // }
  http.delete('/api/containers', async ({ request }) => {
    const reqData = await request.json();
    console.log('params', reqData);
    return HttpResponse.json(null, {
      status: 200,
    });
  }),
];
