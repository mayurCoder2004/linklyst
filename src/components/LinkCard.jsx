import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Copy, Download, Trash } from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import { deleteUrls } from "@/db/apiUrls";
import { BeatLoader } from "react-spinners";

const LinkCard = ({ url, fetchUrls }) => {
  const downloadImage = () => {
    const imageUrl = url?.qr;
    const fileName = url?.title;

    const anchor = document.createElement("a");
    anchor.href = imageUrl;
    anchor.download = fileName;

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrls, url?.id);

  return (
    <div className="flex flex-col md:flex-row gap-6 border border-gray-700 p-6 bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full overflow-hidden">
      <img
        src={url?.qr}
        className="h-32 object-contain ring-4 ring-blue-500 self-start rounded-lg"
        alt="qr code"
      />

      <Link to={`/link/${url.id}`} className="flex flex-col flex-1 gap-3 overflow-hidden">
        <span className="text-2xl sm:text-3xl font-extrabold text-white hover:text-[#36d7b7] cursor-pointer transition-all duration-200">
          {url?.title}
        </span>
        <span className="text-base sm:text-lg text-blue-400 font-semibold truncate">
          {window.location.origin}/{url?.custom_url || url.short_url}
        </span>
        <span className="text-sm text-gray-300 truncate">
          {url?.original_url}
        </span>
        <span className="text-xs text-gray-400 mt-auto">
          {new Date(url?.created_at).toLocaleString()}
        </span>
      </Link>

      <div className="flex gap-2 items-start">
        <Button
          onClick={() =>
            navigator.clipboard.writeText(`https://trimmr.in/${url?.short_url}`)
          }
          className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
          title="Copy Link"
        >
          <Copy size={20} />
        </Button>

        <Button
          onClick={downloadImage}
          className="p-2 rounded-lg bg-green-600 hover:bg-green-700 text-white"
          title="Download QR"
        >
          <Download size={20} />
        </Button>

        <Button
          className="p-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
          title="Delete"
          onClick={() => fnDelete().then(() => fetchUrls())}
        >
          {loadingDelete ? <BeatLoader size={5} color="white" /> : <Trash size={20} />}
        </Button>
      </div>
    </div>
  );
};

export default LinkCard;
