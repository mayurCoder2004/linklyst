import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  
  const [longUrl, setLongUrl] = useState();
  const navigate = useNavigate();

  const handleShorten = (e) => {
    e.preventDefault();
    if (longUrl) navigate(`/auth?createNew=${longUrl}`);
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="font-extrabold text-4xl sm:text-6xl lg:text-7xl leading-tight tracking-tight text-white animate-fadeInUp text-center">
        The only{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300 drop-shadow-md">
          URL Shortener
        </span>{" "}
        <br />
        you'll ever{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-400 to-red-400 drop-shadow-md">
          need
        </span>
        !
        <span className="inline-block ml-2 text-4xl sm:text-6xl lg:text-7xl text-white animate-fadeInUp">
          👇
        </span>
      </h2>

      <form onSubmit={handleShorten} className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full sm:w-3/4 md:w-2/3 mx-auto mt-8">
        <Input
          className="w-full sm:w-2/3 p-4 text-lg rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all duration-300"
          placeholder="Enter your URL"
          type="url"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />
        <Button 
        className="w-full sm:w-1/3 py-4 px-6 bg-gradient-to-r from-teal-500 to-blue-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:from-teal-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300"
        >
          Shorten Link!
        </Button>
      </form>

      <img
        src="./url-shortener-banner.png"
        alt="Banner"
        className="w-full my-11 md:px-11"
      />

      <Accordion type="multiple" collapsible className="w-full mt-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-6 animate-fadeInUp tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300">
            Frequently Asked Questions
          </span>
        </h2>

        <AccordionItem value="item-1">
          <AccordionTrigger className="bg-transparent text-white focus:outline-none focus:ring-0 hover:ring-0 hover:border-0 border-0">
            How does this URL shortener work?
          </AccordionTrigger>
          <AccordionContent className="bg-transparent text-white py-4 px-6 rounded-md hover:bg-teal-500 hover:text-white transition-all duration-300 ease-in-out">
            Just paste your long URL, click "Shorten Link!", and you'll instantly get a short and shareable link.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="bg-transparent text-white focus:outline-none focus:ring-0 hover:ring-0 hover:border-0 border-0">
            Is the shortened link permanent?
          </AccordionTrigger>
          <AccordionContent className="bg-transparent text-white py-4 px-6 rounded-md hover:bg-teal-500 hover:text-white transition-all duration-300 ease-in-out">
            Yes! Once created, your shortened URL remains active unless you choose to delete it manually.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger className="bg-transparent text-white focus:outline-none focus:ring-0 hover:ring-0 hover:border-0 border-0">
            Can I track clicks on my link?
          </AccordionTrigger>
          <AccordionContent className="bg-transparent text-white py-4 px-6 rounded-md hover:bg-teal-500 hover:text-white transition-all duration-300 ease-in-out">
            Absolutely! You'll get detailed analytics on clicks, locations, and more—right from your dashboard.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger className="bg-transparent text-white focus:outline-none focus:ring-0 hover:ring-0 hover:border-0 border-0">
            Is this service free?
          </AccordionTrigger>
          <AccordionContent className="bg-transparent text-white py-4 px-6 rounded-md hover:bg-teal-500 hover:text-white transition-all duration-300 ease-in-out">
            Yes, it's completely free to use. We may offer premium features in the future.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger className="bg-transparent text-white focus:outline-none focus:ring-0 hover:ring-0 hover:border-0 border-0">
            Do I need to sign up?
          </AccordionTrigger>
          <AccordionContent className="bg-transparent text-white py-4 px-6 rounded-md hover:bg-teal-500 hover:text-white transition-all duration-300 ease-in-out">
            No sign-up is required to shorten links. However, creating an account lets you manage and track your links more effectively.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default LandingPage;
