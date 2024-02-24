import ContainerBox from '@/src/components/my/ContainerBox';
import DashboardLayout from '@/src/components/my/DashboardLayout';
import EmptyState from '@/src/components/my/EmptyState';
import { Skeleton } from '@/src/components/ui/skeleton';
import useContainerAPI from '@/src/hooks/useContainerAPI';
import useContainerStore from '@/src/store/useContainerStore';
import useUserStore from '@/src/store/useUserStore';
import { useEffect } from 'react';

const SharedContainerPage = () => {
  const { containerList } = useContainerStore();
  const { getContainersData } = useContainerAPI();
  const { userId } = { ...useUserStore((state) => state.user) };

  useEffect(() => {
    if (userId) {
      getContainersData();
    }
  }, [userId]);

  // while Loading data : Show Skeleton
  if (!containerList) {
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

  if (!containerList.filter((c) => c.shared > 0).length) {
    return (
      <DashboardLayout>
        <EmptyState className="h-[calc(100vh-9rem)]" />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-9rem)] overflow-x-hidden overflow-y-scroll">
        <div className="grid grid-cols-1 gap-5 py-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {containerList
            .filter((c) => c.shared > 0)
            .map((c) => (
              <ContainerBox
                key={c.name}
                containerId={c.id}
                containerName={c.name}
                description={c.description}
                language={c.language}
                active={c.active}
                createDate={c.createDate}
                lastModifiedDate={c.lastModifiedDate}
              />
            ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SharedContainerPage;
