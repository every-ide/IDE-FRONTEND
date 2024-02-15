import { axiosPublic } from '../axios';

export async function axiosFileTree(userId, containerName) {
  try {
    const response = axiosPublic(`api/${userId}/filetree/${containerName}`);
    console.log(
      '파일트리 api 호출:',
      `api/${userId}/filetree/${containerName}`,
    );
    console.log('response: ', (await response).data);
    const data = (await response).data;
    return data;
  } catch (error) {
    console.error('파일 트리 가져오기 오류:', error);
  }
}
