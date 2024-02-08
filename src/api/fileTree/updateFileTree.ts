// import { useFileTreeStore } from '@/store/useFileTreeStore';
// import { transformToFileNodeType } from '../../../utils/filetree/transNodeutils';
// import { axiosPublic } from '../axios';

// export const checkFileTree = async (projectId: string) => {
//   try {
//     const { setFileTree } = useFileTreeStore.getState();

//     const response = await axiosPublic.get(
//       `/api/v2/projects/${projectId}/directory`,
//     );
//     const transformedData = transformToFileNodeType(response.data.results);
//     setFileTree(transformedData); // Zustand 스토어에 저장

//     return response;
//   } catch (error) {
//     console.error(error);
//   }
// };
