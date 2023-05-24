export async function waitForImagesToLoad() {
  const images = Array.from(document.getElementsByTagName('img'))

  await Promise.all(
    images.map((image) => {
      if (image.complete) {
        return Promise.resolve()
      } else {
        return new Promise((resolve) => {
          image.addEventListener('load', resolve)
        })
      }
    })
  )
}
