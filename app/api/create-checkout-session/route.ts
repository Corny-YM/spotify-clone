import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/libs/stripe";
import { getUrl } from "@/libs/helpers";
import { createOrRetrieveCustomer } from "@/libs/supabaseAdmin";

export async function POST(req: Request) {
  const { price, quantity = 1, metadata = {} } = await req.json();

  try {
    const supabase = createRouteHandlerClient({ cookies });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const customer = await createOrRetrieveCustomer({
      uuid: user?.id || "",
      email: user?.email || "",
    });

    const obj = {
      payment_method_types: ["card"],
      billing_address_collection: "required",
      customer,
      line_items: [{ price: price.id, quantity }],
      mode: "subscription",
      allow_promotion_codes: true,
      subscription_data: {
        trial_from_data: true,
        metadata,
      },
      success_url: `${getUrl()}account`,
      cancel_url: `${getUrl()}`,
    };

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      billing_address_collection: "required",
      customer,
      line_items: [{ price: price.id, quantity }],
      mode: "subscription",
      allow_promotion_codes: true,
      subscription_data: {
        metadata,
        trial_period_days: 14, // Example trial period of 14 days,
      },
      success_url: `${getUrl()}account`,
      cancel_url: `${getUrl()}`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
