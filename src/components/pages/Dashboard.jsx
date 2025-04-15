import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Filter } from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import { getUrls } from "@/db/apiUrls";
import { UrlState } from "@/Context";
import { getClicksForUrls } from "@/db/apiClicks";
import Error from "../Error";
import LinkCard from "../LinkCard";
import CreateLink from "../CreateLink";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { user } = UrlState();
  const { loading, error, data: urls, fn: fnUrls } = useFetch(getUrls, user.id);
  const {
    loading: loadingClicks,
    data: clicks,
    fn: fnClicks,
  } = useFetch(getClicksForUrls, urls?.map((url) => url.id));

  useEffect(() => {
    fnUrls();
  }, []);

  useEffect(() => {
    if (urls?.length) fnClicks();
  }, [urls?.length]);

  const filteredUrls = urls?.filter((url) =>
    url.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8 px-4 md:px-8 py-6 overflow-x-hidden">
      {(loading || loadingClicks) && (
        <BarLoader width={"100%"} color="#36d7b7" />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Card className="shadow-lg rounded-2xl transition-transform hover:scale-[1.02]">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{urls?.length}</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg rounded-2xl transition-transform hover:scale-[1.02]">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{clicks?.length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold">My Links</h1>
        <CreateLink />
      </div>

      <div className="relative w-full max-w-md">
        <Input
          type="text"
          placeholder="Filter Links..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 shadow-sm focus:ring-2 focus:ring-[#36d7b7] rounded-xl w-full"
        />
        <Filter className="absolute top-2.5 left-2.5 w-5 h-5 text-gray-500" />
      </div>

      {error && <Error message={error?.message} />}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        {(filteredUrls || []).map((url, i) => (
          <LinkCard key={i} url={url} fetchUrls={fnUrls} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
