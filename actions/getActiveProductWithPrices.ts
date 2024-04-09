import { cookies } from "next/headers";

import { ProductWithPrice } from "@/types/common";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

const getActiveProductWithPrices = async (): Promise<ProductWithPrice[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data, error } = await supabase
    .from("products")
    .select("*, prices(*)")
    .eq("active", true)
    .eq("prices.active", true)
    .order("metadata->index")
    .order("unit_amount", { referencedTable: "prices" });

  if (error) console.log(error.message);

  return (data as any) || [];
};

export default getActiveProductWithPrices;
