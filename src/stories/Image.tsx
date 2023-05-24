import { useState } from "react";

export const Image = ({ description }: { description: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingTime, setLoadingTime] = useState<string>();
  const startTime = performance.now();

  const handleImageLoad = () => {
    const endTime = performance.now();
    const duration = endTime - startTime;
    duration.toFixed(2)
    setLoadingTime(duration.toFixed(2));
    setIsLoading(false);
  };

  return (
    <section>
      <h1>Handling image loading</h1>
      <h5>Approach:</h5> {description}
      <br />
      <small>Remember to disable cache in the network panel while testing this!</small>
      <hr />
      <p>{isLoading ? "Image is loading..." : `Image loaded in ${loadingTime} ms`}</p>
      <img
        src="https://wallpaperaccess.com/full/11729.jpg"
        width={300}
        onLoad={handleImageLoad}
      />
    </section>
  );
};
