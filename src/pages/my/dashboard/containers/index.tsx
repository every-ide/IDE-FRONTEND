import ContainerBox from '@/src/components/my/ContainerBox';
import DashboardLayout from '@/src/components/my/DashboardLayout';
import { useEffect } from 'react';

const ContainerPage = () => {
  useEffect(() => {}, []);

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 gap-x-5 gap-y-10 p-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {temporaryContainerData.map((c) => (
          <ContainerBox
            key={c.containerId}
            containerId={c.containerId}
            containerName={c.containerName}
            language={c.language}
            type={c.type}
            createdAt={c.createdAt}
            lastUpdatedAt={c.lastUpdatedAt}
          />
        ))}
      </div>
    </DashboardLayout>
  );
};

export default ContainerPage;

const temporaryContainerData = [
  {
    containerId: '123',
    containerName: 'my-container',
    language: 'javascript',
    type: 'private',
    createdAt: new Date(),
    lastUpdatedAt: new Date(),
  },
  {
    containerId: '2',
    containerName: 'my-container2',
    language: 'python',
    type: 'shared',
    createdAt: new Date(),
    lastUpdatedAt: new Date(),
  },
  {
    containerId: '3',
    containerName: 'my-container3',
    language: 'java',
    type: 'private',
    createdAt: new Date(),
    lastUpdatedAt: new Date(),
  },
  {
    containerId: '4',
    containerName: 'my-container4',
    language: 'javascript',
    type: 'shared',
    createdAt: new Date(),
    lastUpdatedAt: new Date(),
  },
  {
    containerId: '5',
    containerName: 'my-container5',
    language: 'javascript',
    type: 'private',
    createdAt: new Date(),
    lastUpdatedAt: new Date(),
  },
];
