import Image from "next/image";
import { photoSlots, type PhotoSlotId } from "@/data/content";

export default function PhotoFrame({
  slot,
  src,
  alt,
  caption,
  aspect,
  className = "",
}: {
  slot: PhotoSlotId;
  src?: string;
  alt?: string;
  caption?: string;
  aspect?: string;
  className?: string;
}) {
  const info = photoSlots[slot];
  return (
    <figure className={`photo-slot ${src ? "photo-filled" : ""} ${className}`} style={{ aspectRatio: aspect ?? info.aspect }}>
      {src ? (
        <Image src={src} alt={alt ?? slot} fill sizes="(max-width: 768px) 90vw, 40vw" className="object-cover rounded-[14px]" />
      ) : (
        <>
          <span className="tape" />
          <span className="micro opacity-70">photo slot</span>
          <span className="font-display text-xl font-extrabold">“{slot}”</span>
          <span className="max-w-[36ch] text-sm opacity-75">{info.want}</span>
        </>
      )}
      {caption ? <figcaption className="micro absolute bottom-2 opacity-70">{caption}</figcaption> : null}
    </figure>
  );
}
