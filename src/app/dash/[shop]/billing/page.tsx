import { createServerClient } from "@/utils/supabase/server";
import { createSuperClient } from "@/utils/supabase/superuser";
import { redirect } from "next/navigation";
import ActivateSnippet from "./activate-snippet";

export default async function ShopPage({
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

  if (!shopData.subscriptions || shopData.subscriptions.length == 0) {
    return <ActivateSnippet shop={shop} shop_names={shopData.shop_names} />;
  }

  return <div>Πληρωμές</div>;
}
