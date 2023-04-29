export default function ImageGalleryItem({ data }) {
  const { webformatURL, tags } = data;

  return (
    <li className="photo-card">
      <img className="photo-card-img" src={webformatURL} alt={tags} />
    </li>
  );
}
