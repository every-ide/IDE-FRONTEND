import ContainerBox from '@/src/components/my/ContainerBox';
import DashboardLayout from '@/src/components/my/DashboardLayout';
import useContainerAPI from '@/src/hooks/useContainerAPI';
import useContainerStore from '@/src/store/useContainerStore';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const ContainerPage = () => {
  const { containerList } = useContainerStore();
  const { getContainersData } = useContainerAPI();

  useEffect(() => {
    getContainersData();
  }, []);

  // while Loading data : Show Skeleton
  if (!containerList.length) {
    return (
      <DashboardLayout>
        <div className="grid grid-cols-1 gap-x-5 gap-y-10 p-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Skeleton className="h-[230px] w-full rounded-xl" />
          <Skeleton className="h-[230px] w-full rounded-xl" />
          <Skeleton className="h-[230px] w-full rounded-xl" />
          <Skeleton className="h-[230px] w-full rounded-xl" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 gap-x-5 gap-y-10 p-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {containerList.map((c) => (
          <ContainerBox
            key={c.name}
            containerName={c.name}
            description={c.description}
            language={c.language}
            createDate={c.createDate}
            lastModifiedDate={c.lastModifiedDate}
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
