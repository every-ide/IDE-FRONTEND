import ContainerBox from '@/src/components/my/ContainerBox';
import DashboardLayout from '@/src/components/my/DashboardLayout';
import EmptyState from '@/src/components/my/EmptyState';
import { Skeleton } from '@/src/components/ui/skeleton';
import useContainerStore from '@/src/store/useContainerStore';

const MyContainerPage = () => {
  const { containerList } = useContainerStore();

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

  if (!containerList.length) {
    return (
      <DashboardLayout>
        <EmptyState />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 gap-x-5 gap-y-10 p-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
    </DashboardLayout>
  );
};

export default MyContainerPage;
