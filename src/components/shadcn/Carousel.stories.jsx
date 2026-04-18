import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./Carousel"

export default {
  title: "Components/Carousel",
  component: Carousel,
  tags: ["autodocs"],
}

export const CarouselPlayground = {
  render: () => (
    <div className="w-full max-w-xs mx-auto">
      <Carousel>
        <CarouselContent>
          <CarouselItem>
            <div className="p-4 bg-muted rounded-md">
              <p className="text-center font-medium">Slide 1</p>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="p-4 bg-muted rounded-md">
              <p className="text-center font-medium">Slide 2</p>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
}

export const CarouselGallery = {
  render: () => (
    <div className="space-y-8 w-full">
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Basic</h2>
        <div className="w-full max-w-xs mx-auto">
          <Carousel>
            <CarouselContent>
              <CarouselItem>
                <div className="p-4 bg-muted rounded-md">
                  <p className="text-center font-medium">Slide 1</p>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="p-4 bg-muted rounded-md">
                  <p className="text-center font-medium">Slide 2</p>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="p-4 bg-muted rounded-md">
                  <p className="text-center font-medium">Slide 3</p>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Multiple Slides</h2>
        <div className="w-full max-w-md mx-auto">
          <Carousel>
            <CarouselContent>
              {[1, 2, 3, 4, 5].map((i) => (
                <CarouselItem key={i}>
                  <div className="p-6 bg-muted rounded-md">
                    <p className="text-center font-medium">Slide {i}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>
    </div>
  ),
}
