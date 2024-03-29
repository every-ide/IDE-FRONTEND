import ContainerBox from '@/src/components/my/ContainerBox';
import DashboardLayout from '@/src/components/my/DashboardLayout';
import useContainerAPI from '@/src/hooks/useContainerAPI';
import useContainerStore from '@/src/store/useContainerStore';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import EmptyState from '@/src/components/my/EmptyState';
import useUserStore from '@/src/store/useUserStore';
import SEOMetaTag from '@/src/SEO/SEOMetaTag';

const ContainerPage = () => {
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
        <div className="grid grid-cols-1 gap-5 p-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Skeleton className="h-[230px] w-full rounded-xl" />
          <Skeleton className="h-[230px] w-full rounded-xl" />
          <Skeleton className="h-[230px] w-full rounded-xl" />
          <Skeleton className="h-[230px] w-full rounded-xl" />
        </div>
      </DashboardLayout>
    );
  }

  if (!containerList.length) {
    return (
      <DashboardLayout>
        <EmptyState className="h-[calc(100vh-9rem)]" />
      </DashboardLayout>
    );
  }
  return (
    <>
      <SEOMetaTag
        title="EVERYIDE - My Dashboard"
        url="https://ide-frontend-wheat.vercel.app/my/dashboard"
      />
      <DashboardLayout>
        <div className="h-[calc(100vh-9rem)] overflow-x-hidden overflow-y-scroll">
          <div className="grid grid-cols-1 gap-x-5 gap-y-10 py-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {containerList.map((c) => (
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
    </>
  );
};

export default ContainerPage;
