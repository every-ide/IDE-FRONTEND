import useAxiosPrivate from './useAxiosPrivate';
import useUserStore from '../store/useUserStore';

const useFileTreeApi = () => {
  const axiosPrivate = useAxiosPrivate();
  const { userId, email } = { ...useUserStore((state) => state.user) };

  const axiosFileTree = async (containerName: string) => {
    try {
      const response = axiosPrivate.get(
        `api/${userId}/filetree/${containerName}`,
      );
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
  };

  const axiosOpenFile = async (containerName: string, path: string) => {
    try {
      const response = axiosPrivate.get(
        `api/containers/${containerName}/files?path=${path}`,
      );
      console.log(`api/containers/${containerName}/files?path=${path}`);
      const data = await response;
      return data;
    } catch (error) {
      console.error('파일 열기 오류:', error);
    }
  };

  const axiosCreateDir = async (containerName: string, path: string) => {
    const newPath = `/${containerName}/${path}`;
    try {
      const response = await axiosPrivate.post(`/api/directories`, {
        email,
        newPath,
      });
      console.log('파일 생성 api 호출:', `/api/directories`);
      console.log('response: ', response);
    } catch (error) {
      console.error('파일 생성 오류:', error);
    }
  };

  const axiosDeleteDir = async (containerName: string, path: string) => {
    const newPath = `/${containerName}/${path}`;
    try {
      const response = await axiosPrivate.delete(`/api/directories`, {
        data: { email, newPath },
      });
      console.log('파일 삭제 api 호출:', `/api/directories`);
      console.log('response: ', response);
    } catch (error) {
      console.error('파일 삭제 오류:', error);
    }
  };

  const axiosRenameDir = async (
    containerName: string,
    oldPath: string,
    newPath: string,
  ) => {
    const refaceOldPath = `/${containerName}/${oldPath}`;
    const refaceNewPath = `/${containerName}/${newPath}`;
    try {
      const response = await axiosPrivate.patch(`/api/directories`, {
        email,
        refaceOldPath,
        refaceNewPath,
      });
      console.log('파일 이름 변경 api 호출:', `/api/directories`);
      console.log('response: ', response);
    } catch (error) {
      console.error('파일 이름 변경 오류:', error);
    }
  };

  const axiosCreateFile = async (containerName: string, path: string) => {
    const newPath = `/${containerName}/${path}`;
    const content = '';
    try {
      const response = await axiosPrivate.post(`/api/files`, {
        email,
        newPath,
        content,
      });
      console.log('파일 생성 api 호출:', `/api/files`);
      console.log('response: ', response);
    } catch (error) {
      console.error('파일 생성 오류:', error);
    }
  };

  const axiosRenameFile = async (
    containerName: string,
    oldPath: string,
    newPath: string,
  ) => {
    const refaceOldPath = `/${containerName}/${oldPath}`;
    const refaceNewPath = `/${containerName}/${newPath}`;
    try {
      const response = await axiosPrivate.patch(`/api/files`, {
        email,
        refaceOldPath: refaceOldPath,
        refaceNewPath,
      });
      console.log('파일 이름 변경 api 호출:', `/api/files`);
      console.log('response: ', response);
    } catch (error) {
      console.error('파일 이름 변경 오류:', error);
    }
  };

  const axiosDeleteFile = async (containerName: string, path: string) => {
    try {
      const response = await axiosPrivate.delete(
        `/api/containers/${containerName}/files`,
        {
          data: { email, path },
        },
      );
      console.log('File deleted successfully', response.data);
      return response.data;
    } catch (error) {
      console.error('File deletion error:', error);
      throw error;
    }
  };

  return {
    axiosFileTree,
    axiosOpenFile,
    axiosCreateDir,
    axiosDeleteDir,
    axiosRenameDir,
    axiosCreateFile,
    axiosRenameFile,
    axiosDeleteFile,
  };
};

export default useFileTreeApi;
