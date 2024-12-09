import { createServerClient } from "@/utils/supabase/server";
import { createSuperClient } from "@/utils/supabase/superuser";
import { redirect } from "next/navigation";
import ChoosePlans from "./choose-plans";

export default async function ActivatPage({
  params,
}: {
  params: Promise<{ shop: string }>;
}) {
  const shop = (await params).shop;
  const supabase = await createServerClient();
  const userQuery = await supabase.auth.getUser();
  if (
    userQuery.error ||
    !userQuery.data ||
    !userQuery.data.user ||
    !userQuery.data.user.id
  ) {
    return redirect("/dash");
  }

  const user = userQuery.data.user;

  const supabaseSuper = await createSuperClient();
  const shopQuery = await supabaseSuper
    .from("shops")
    .select(
      `
      id,
      pathname,
      shop_names (
        id,
        locale,
        text
      ),
      owner,
      subscriptions (
        created_at,
        status,
        form,
        stripe_subscriptions (
          stripe_customer_id
        )
      )
    `
    )
    .eq("pathname", shop)
    .single();

  if (shopQuery.error || !shopQuery.data || shopQuery.data.owner != user.id) {
    return redirect("/dash");
  }

  const shopData = shopQuery.data;

  // add check for active subscriptions !!!! IMPORTANT IMPORTANT        sjskjskjsjjksjksjksj
  if (shopData.subscriptions.length != 0) {
    return <div>hEllo</div>;
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row gap-1">
        <h2 className="text-2xl font-normal">Ενεργοποιήστε το μαγαζί:</h2>
        <h2 className="text-2xl font-semibold">
          {shopData.shop_names.map((e) => e.text).join("/")}{" "}
        </h2>
      </div>
      <div>
        <ChoosePlans shop={shop} />
      </div>
    </div>
  );
}
