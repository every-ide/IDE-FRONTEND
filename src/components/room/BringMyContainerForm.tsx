import { FormEvent, useCallback, useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import useUserStore from '@/src/store/useUserStore';
import useContainerAPI from '@/src/hooks/useContainerAPI';
import { IContainer } from '@/src/store/useContainerStore';
import { toast } from 'react-toastify';

const BringMyContainerForm = () => {
  const { user } = useUserStore();
  const { getContainersData, bringContainerToRoom } = useContainerAPI();
  const [openModal, setOpenModal] = useState(false);
  const [containerList, setContainerList] = useState<IContainer[]>([]);
  const [listSetted, setListSetted] = useState(false);
  const [selectedId, setSelectedId] = useState<string>();
  const [submitting, setSubmitting] = useState(false);

  const fetchMyContainerList = useCallback(async () => {
    try {
      // Test용!!!! (추후 삭제)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const fetchedContainerList = await getContainersData();
      setContainerList(fetchedContainerList);
      setListSetted(true);
    } catch (error) {
      console.error(error);

      toast.error('컨테이너 목록을 불러오는 데 실패했습니다.', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        theme: 'dark',
      });
    }
  }, [user]);

  useEffect(() => {
    if (openModal === true) {
      fetchMyContainerList();
    }
  }, [openModal]);

  const bringContainerRequest = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    if (selectedId) {
      try {
        const response = await bringContainerToRoom(selectedId);

        if (response.status === 200) {
          toast('컨테이너 불러오기 성공 🎉', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            theme: 'dark',
          });

          setOpenModal(false);
        }
      } catch (error) {
        console.error(error);

        toast.error('문제가 발생했습니다. 다시 시도해주세요.', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          theme: 'dark',
        });
      }
    }

    setSubmitting(false);
  };

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <Button
          onClick={() => {}}
          variant="outline"
          className="bg-mdark active:scale-95"
        >
          내 컨테이너 불러오기
        </Button>
      </DialogTrigger>

      <DialogContent className="text-black">
        <DialogHeader>
          <DialogTitle className="text-black">
            기존 컨테이너 불러오기
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={(e) => bringContainerRequest(e)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="container" className="text-right text-black">
                컨테이너 선택
              </Label>
              <Select required onValueChange={(value) => setSelectedId(value)}>
                <SelectTrigger className="col-span-3 text-black">
                  <SelectValue
                    id="container"
                    placeholder={
                      listSetted
                        ? '컨테이너를 선택하세요'
                        : '컨테이너 로딩 중...'
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {listSetted ? (
                    containerList.length ? (
                      containerList.map((c) => (
                        <SelectItem key={c.id} value={c.id.toString()}>
                          {c.name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem disabled value="empty">
                        컨테이너가 없습니다.
                      </SelectItem>
                    )
                  ) : (
                    <SelectItem disabled value="loading">
                      컨테이너 로딩 중
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" className="border-none" disabled={submitting}>
              {submitting ? '컨테이너를 불러오는 중입니다...' : '불러오기'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BringMyContainerForm;
