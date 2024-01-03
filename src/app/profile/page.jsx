"use client";
import { useSession } from "next-auth/react";
import Loading from "@/app/loading";
import axios from "axios";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

import ProfileTab from "@/components/layout/profile_components/ProfileTab";
import CategoriesTab from "@/components/layout/profile_components/CategoriesTab";
import MenuItemTab from "@/components/layout/profile_components/MenuItemTab";
import UsersTab from "@/components/layout/profile_components/UsersTab";
import useSWR from "swr";
import Error from "@/app/error";
import { redirect } from "next/navigation";
export default function ProfilePage() {
  const session = useSession();
  if (session.status==="unauthenticated") {
    redirect("/login");
  }
  const fetcher = async () => {
    const response = await axios.get("/api/profile");
    return response.data;
  };

  // Get categories data from server with SWR
  const { data: user, error, isLoading } = useSWR("user", fetcher);

  let tabs = [
    {
      id: "Profile",
      label: "Profile",
      content: <ProfileTab user={user} />,
    },
    {
      id: "Categories",
      label: "Categories",
      content: <CategoriesTab />,
    },
    {
      id: "Menu",
      label: "Menu Items",
      content: <MenuItemTab />,
    },
    {
      id: "Users",
      label: "Users",
      content: <UsersTab />,
    },
  ];

  if (error) return <Error />;
  if (isLoading) return <Loading />;
  return (
    <>
      {session.status === "loading" ? (
        <Loading />
      ) : (
        <section className="mt-14 w-full mx-auto font-semibold">
          {user?.admin ? (
            <Tabs aria-label="Dynamic tabs" items={tabs}>
              {(item) => (
                <Tab key={item.id} title={item.label}>
                  <Card>
                    <CardBody>{item.content}</CardBody>
                  </Card>
                </Tab>
              )}
            </Tabs>
          ) : (
            <Tabs aria-label="Dynamic tabs" items={tabs[0]}>
              <Tab key={tabs[0].id} title={tabs[0].label}>
                <Card>
                  <CardBody>{tabs[0].content}</CardBody>
                </Card>
              </Tab>
            </Tabs>
          )}
        </section>
      )}
    </>
  );
}
