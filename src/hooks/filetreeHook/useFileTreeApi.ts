import useAxiosPrivate from '../useAxiosPrivate';
import useUserStore from '../../store/useUserStore';
import { useFileTreeStore } from '../../store/useFileTreeStore';
import { useLocation, useSearchParams } from 'react-router-dom';

import { useParams } from 'react-router-dom';

const useFileTreeApi = () => {
  const axiosPrivate = useAxiosPrivate();
  const { userId, email } = { ...useUserStore((state) => state.user) };
  const { containerName } = useFileTreeStore();
  const location = useLocation();
  const path = location.pathname;
  const { containerId: projectId } = useParams<{ containerId: string }>();
  const [searchParams] = useSearchParams();
  const hasTeamspace = path.includes('teamspace');
  const roomId = searchParams.get('roomId');
  const axiosFileTree = async (containerName: string) => {
    // console.log('containerName: ', containerName);
    try {
      if (hasTeamspace) {
        const response = axiosPrivate.get(
          `api/${roomId}/filetree/${containerName}`,
        );
        const data = (await response).data;
        console.log(
          '`api/${roomId}/filetree/${containerName}`: ',
          `api/${roomId}/filetree/${containerName} : `,
        );
        console.log('data: ', data);
        return data;
      }
      const response = axiosPrivate.get(
        `api/${userId}/filetree/${containerName}`,
      );
      console.log(
        '`api/${userId}/filetree/${containerName}`: ',
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

  const getAuthEmail = () => (hasTeamspace ? roomId : email);

  const performOperation = async ({
    type,
    operation,
    containerName,
    path,
    newPath = '',
    content = '',
  }: {
    type: string;
    operation: string;
    containerName: string;
    path: string;
    newPath?: string;
    content?: string;
  }) => {
    const basePath = `/${containerName}${path}`;
    const url = `/api/${type === 'file' ? 'files' : 'directories'}`;
    const authEmail = getAuthEmail();
    let response;

    try {
      if (operation === 'create') {
        const data = {
          email: authEmail,
          path: basePath,
          ...(type === 'file' ? { content } : {}),
        };
        response = await axiosPrivate.post(url, data);
      } else if (operation === 'delete') {
        const data = { email: authEmail, path: basePath };
        response = await axiosPrivate.delete(url, { data });
      } else if (operation === 'rename') {
        const data = {
          email: authEmail,
          fromPath: basePath,
          toPath: `/${containerName}${newPath}`,
        };
        response = await axiosPrivate.patch(url, data);
      } else {
        throw new Error('Unsupported operation');
      }

      console.log(`${type} ${operation} operation successful:`, response);
      return response.data;
    } catch (error) {
      console.error(`${type} ${operation} operation error:`, error);
      throw error;
    }
  };

  const axiosCreateIsFile = async (
    containerName: string,
    path: string,
    type: string,
    content = '',
  ) => {
    return performOperation({
      type,
      operation: 'create',
      containerName,
      path,
      content,
    });
  };

  const axiosDeleteIsFile = async (
    containerName: string,
    path: string,
    type: string,
  ) => {
    return performOperation({ type, operation: 'delete', containerName, path });
  };

  const axiosRenameIsFile = async (
    containerName: string,
    oldPath: string,
    newPath: string,
    type: string,
  ) => {
    return performOperation({
      type,
      operation: 'rename',
      containerName,
      path: oldPath,
      newPath,
    });
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
