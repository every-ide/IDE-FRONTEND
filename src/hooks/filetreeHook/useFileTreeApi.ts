import useAxiosPrivate from '../useAxiosPrivate';
import useUserStore from '../../store/useUserStore';
import { useFileTreeStore } from '../../store/useFileTreeStore';
import { useLocation } from 'react-router-dom';

import { useParams } from 'react-router-dom';

const useFileTreeApi = () => {
  const axiosPrivate = useAxiosPrivate();
  const { userId, email } = { ...useUserStore((state) => state.user) };
  const { containerName } = useFileTreeStore();
  const location = useLocation();
  const path = location.pathname;
  const { containerId: projectId } = useParams<{ containerId: string }>();
  const { roomId } = useParams<{ roomId: string }>();

  const hasTeamspace = path.includes('teamspace');

  const axiosFileTree = async (containerName: string) => {
    // console.log('containerName: ', containerName);
    try {
      if (hasTeamspace) {
        const response = axiosPrivate.get(
          `api/${roomId}/filetree/${containerName}`,
        );
        const data = (await response).data;
        return data;
      }
      const response = axiosPrivate.get(
        `api/${userId}/filetree/${containerName}`,
      );
      const data = (await response).data;
      return data;
    } catch (error) {
      console.error('파일 트리 가져오기 오류:', error);
    }
  };

  const axiosOpenFile = async (path: string) => {
    try {
      const response = axiosPrivate.get(
        `api/containers/${projectId}/files?path=${path}`,
      );
      console.log(`api/containers/${projectId}/files?path=${path}`);
      const data = await response;
      return data;
    } catch (error) {
      console.error('파일 열기 오류:', error);
    }
  };

  const axiosCreateDir = async (containerName: string, name: string) => {
    const path = `/${containerName}${name}`;
    console.log('파일 생성 보내기직전 점검 : ', email, path);
    try {
      const response = await axiosPrivate.post(`/api/directories`, {
        email,
        path,
      });
      console.log('파일 생성 api 호출:', `/api/directories`);
      console.log('response: ', response);
    } catch (error) {
      console.error('파일 생성 오류:', error);
    }
  };

  const axiosDeleteDir = async (containerName: string, deletePath: string) => {
    const path = `/${containerName}${deletePath}`;
    try {
      const response = await axiosPrivate.delete(`/api/directories`, {
        data: {
          email,
          path,
        },
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
    const fromPath = `/${containerName}${oldPath}`;
    const toPath = `/${containerName}${newPath}`;
    try {
      const response = await axiosPrivate.patch(`/api/directories`, {
        email,
        fromPath,
        toPath,
      });
      console.log('파일 이름 변경 api 호출:', `/api/directories`);
      console.log('response: ', response);
    } catch (error) {
      console.error('파일 이름 변경 오류:', error);
    }
  };

  const axiosCreateFile = async (containerName: string, name: string) => {
    const path = `/${containerName}${name}`;
    const content = '';
    try {
      console.log(
        '/api/files : 파일 생성 email,path,content,: ',
        email,
        path,
        content,
      );
      const response = await axiosPrivate.post(`/api/files`, {
        email,
        path,
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
    const fromPath = `/${containerName}${oldPath}`;
    const toPath = `/${containerName}${newPath}`;
    try {
      const response = await axiosPrivate.patch(`/api/files`, {
        email,
        fromPath,
        toPath,
      });
      console.log('파일 이름 변경 api 호출:', `/api/files`);
      console.log('response: ', response);
    } catch (error) {
      console.error('파일 이름 변경 오류:', error);
    }
  };

  const axiosDeleteFile = async (containerName: string, deletePath: string) => {
    const path = `/${containerName}${deletePath}`;
    try {
      const response = await axiosPrivate.delete(`/api/files`, {
        data: {
          email,
          path,
        },
      });
      console.log('File deleted successfully', response.data);
      return response.data;
    } catch (error) {
      console.error('File deletion error:', error);
      throw error;
    }
  };

  const axiosCreateIsFile = async (
    containerName: string,
    path: string,
    type: string,
  ) => {
    if (type === 'file') {
      await axiosCreateFile(containerName, path);
    } else {
      await axiosCreateDir(containerName, path);
    }
  };

  const axiosRenameIsFile = async (
    containerName: string,
    oldPath: string,
    newPath: string,
    type: string,
  ) => {
    if (type === 'file') {
      await axiosRenameFile(containerName, oldPath, newPath);
    } else {
      await axiosRenameDir(containerName, oldPath, newPath);
    }
  };

  const axiosDeleteIsFile = async (
    containerName: string,
    path: string,
    type: string,
  ) => {
    if (type === 'file') {
      await axiosDeleteFile(containerName, path);
    } else {
      await axiosDeleteDir(containerName, path);
    }
  };

  const axiosUploadLocalFile = async (file: File) => {
    const path = `/${containerName}/`;
    console.log('containerName: ', containerName);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('path', path);
    if (email) {
      formData.append('email', email);
    }
    console.log('file: ', file);
    console.log('path: ', path);
    console.log('email: ', email);

    console.log('formData: ', formData.get('file'));
    console.log('formData: ', formData.get('path'));
    console.log('formData: ', formData.get('email'));
    try {
      const response = await axiosPrivate.post(`/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('File uploaded successfully', response.data);
      return response.data;
    } catch (error) {
      console.error('File upload error:', error);
      throw error;
    }
  };

  return {
    axiosFileTree,
    axiosOpenFile,
    axiosCreateIsFile,
    axiosRenameIsFile,
    axiosDeleteIsFile,
    axiosUploadLocalFile,
  };
};

export default useFileTreeApi;
