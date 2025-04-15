import { UrlState } from "../Context.jsx";
import { getClicksForUrl } from "@/db/apiClicks";
import { deleteUrls, getUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import { Copy, Download, LinkIcon, Trash } from "lucide-react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader, BeatLoader } from "react-spinners";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Location from "../Location";
import DeviceStats from "../DeviceStats";

const Link = () => {
  const { user } = UrlState();
  const { id } = useParams();

  const {
    loading,
    data: url,
    fn,
    error,
  } = useFetch(getUrl, { id, user_id: user?.id });

  const {
    loading: loadingStats,
    data: stats,
    fn: fnStats,
  } = useFetch(() => getClicksForUrl(id));  

  useEffect(() => {
    fn();
    fnStats().then(() => {
      console.log("Stats fetched:", stats);
    });
  }, []);
  

  let link = "";
  if (url) {
    link = url?.custom_url ? url?.custom_url : url.short_url;
  }

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

  const { loading: loadingDelete, fn: fnDelete } = useFetch(
    deleteUrls,
    url?.id
  );
  return (
    <>
      {(loading || loadingStats) && (
        <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
      )}

      <div className="flex flex-col gap-8 sm:flex-row justify-between">
        <div className="flex flex-col items-start gap-8 rounded-lg sm:w-2/5">
          <span className="text-6xl font-extrabold hover:underline cursor-pointer">
            {url?.title}
          </span>
          <a
            href={`${window.location.origin}/${link}`}
            target="_blank"
            className="text-3xl sm:text-4xl text-blue-400 font-bold hover:underline cursor-pointer"
          >
            {`${window.location.origin}/${link}`}
          </a>
          <a
            href={url?.original_url}
            target="_blank"
            className="flex items-center gap-1 hover:underline cursor-pointer"
          >
            <LinkIcon className="p-1" />
            {url?.original_url}
          </a>
          <span className="flex items-end font-extralight text-sm">
            {new Date(url?.created_at).toLocaleString()}
          </span>

          <div className="flex gap-2 items-start">
            <Button
              onClick={() =>
                navigator.clipboard.writeText(
                  `https://trimmr.in/${url?.short_url}`
                )
              }
              className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition duration-300"
              title="Copy Link"
            >
              <Copy size={20} />
            </Button>

            <Button
              onClick={downloadImage}
              className="p-2 rounded-lg bg-green-600 hover:bg-green-700 text-white transition duration-300"
              title="Download QR"
            >
              <Download size={20} />
            </Button>

            <Button
              className="p-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition duration-300"
              title="Delete"
              onClick={() => fnDelete().then(() => fetchUrls())}
            >
              {loadingDelete ? (
                <BeatLoader size={5} color="white" />
              ) : (
                <Trash size={20} />
              )}
            </Button>
          </div>
          <img
            src={url?.qr}
            className="w-full self-center sm:self-start ring ring-blue-500 p-1 object-contain"
            alt=""
          />
        </div>

        <Card className="sm:w-3/5">
          <CardHeader>
            <CardTitle className="text-4xl font-extrabold">Stats</CardTitle>
          </CardHeader>
          {stats && stats?.length ? (
            <CardContent className="flex flex-col gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>
                    Total Clicks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{stats?.length}</p>
                </CardContent>
              </Card>

              <CardTitle>Location Data</CardTitle>
              <Location stats={stats} />
              <CardTitle>Device Info</CardTitle>
              <DeviceStats stats={stats} />
            </CardContent>
          ) : (
            <CardContent>
              {loadingStats === false
                ? "No Statistics yet"
                : "Loading Statistics.."}
            </CardContent>
          )}
        </Card>
      </div>
    </>
  );
};

export default Link;
