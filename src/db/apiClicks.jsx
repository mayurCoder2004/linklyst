import supabase from "./supabase";

export async function getClicksForUrls(urlIds) {
  if (!urlIds || urlIds.length === 0) return [];

  const { data, error } = await supabase
    .from("clicks")
    .select("*")
    .in("url_id", urlIds);

  if (error) {
    console.error(error.message);
    throw new Error("Unable to load Clicks");
  }

  return data;
}


export async function getClicksForUrl(url_id) {
  console.log("Fetching clicks for URL ID:", url_id);
  
  const { data, error } = await supabase
    .from("clicks")
    .select("*")
    .eq("url_id", url_id);

  if (error) {
    console.error("Supabase error:", error.message);
    throw new Error("Unable to load Stats");
  }

  console.log("Supabase returned:", data);
  return data;
}

