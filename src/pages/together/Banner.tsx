import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import BannerImage1 from '@/src/assets/images/banner-1.png';
import BannerImage2 from '@/src/assets/images/banner-2.png';
import BannerImage3 from '@/src/assets/images/banner-3.png';
const Banner = () => {
  return (
    <div className="container mx-auto mt-4 h-[250px] px-16">
      <Carousel
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        opts={{
          align: 'start',
          loop: true,
        }}
      >
        <CarouselContent>
          <CarouselItem>
            <div className="mx-auto flex max-w-5xl justify-between">
              <div className="flex flex-col gap-y-5 py-6">
                <p className=" max-w-fit rounded bg-accent px-2 py-0.5">
                  STEP 1
                </p>
                <h1 className="text-2xl font-semibold">커뮤니티 생성하기</h1>
                <p className="">
                  질문이 있거나 지식을 공유하고싶을때 언제든지 커뮤니티를 생성할
                  수 있어요.
                </p>
              </div>
              <img src={BannerImage1} alt="Second slide" />
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="mx-auto flex max-w-5xl justify-between">
              <div className="flex flex-col gap-y-5 py-6">
                <p className=" max-w-fit rounded bg-accent px-2 py-0.5">
                  STEP 2
                </p>
                <h1 className="text-2xl font-semibold">팀원 기다리기</h1>
                <p className="">커뮤니티 팀원의 참가를 기다려요.</p>
              </div>
              <img src={BannerImage2} alt="First slide" />
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="mx-auto flex max-w-5xl justify-between">
              <div className="flex flex-col gap-y-5 py-6">
                <p className=" max-w-fit rounded bg-accent px-2 py-0.5">
                  STEP 3
                </p>
                <h1 className="text-2xl font-semibold">지식 공유하기</h1>
                <p className="">
                  여러 컨테이너를 만들고 실시간 IDE로 지식을 공유하세요.
                </p>
              </div>
              <img src={BannerImage3} alt="Third slide" />
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Banner;
