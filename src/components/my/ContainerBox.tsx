import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '../ui/button';
import { MdOutlineDelete, MdOutlineSettings } from 'react-icons/md';

interface IContainerBoxProps {
  containerId: string;
  containerName: string;
  language: string;
  type: string;
  createdAt: Date;
  lastUpdatedAt: Date;
}

const ContainerBox = ({
  containerId,
  containerName,
  language,
  type,
  createdAt,
  lastUpdatedAt,
}: IContainerBoxProps) => {
  const navigateToUrlInNewTab = (containerId: string) => {
    window.open(
      `http://localhost:5173/workspace/${containerId}`,
      '_blank',
      'noopener,noreferrer',
    );
  };

  return (
    <Card variant="container">
      <CardHeader className="pb-4">
        <div className="flex flex-row justify-between">
          <CardTitle className="text-xl">{containerName}</CardTitle>
          <div className="flex flex-row gap-2">
            <Button variant="icon" size="icon" className="p-0 text-[#888]">
              <MdOutlineSettings size={20} />
            </Button>
            <Button variant="icon" size="icon" className="p-0 text-[#888]">
              <MdOutlineDelete size={20} />
            </Button>
          </div>
        </div>
        <CardDescription className="text-[#888]">
          {language} | {type}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2 pt-0 text-sm">
        <p>created: </p>
        <p>last update:</p>
      </CardContent>
      <CardFooter className="justify-end">
        <Button onClick={() => navigateToUrlInNewTab(containerId)} size="sm">
          컨테이너 열기
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ContainerBox;
