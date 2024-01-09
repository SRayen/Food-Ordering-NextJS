"use client";
import { useSession } from "next-auth/react";
import Loading from "@/app/loading";
import axios from "axios";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import ProfileTab from "@/components/layout/profile_components/ProfileTab";
import CategoriesTab from "@/components/layout/profile_components/CategoriesTab";
import MenuItemTab from "@/components/layout/profile_components/MenuItemTab";
import UsersTab from "@/components/layout/profile_components/UsersTab";
import OrdersTab from "@/app/orders/page";
import useSWR from "swr";
import Error from "@/app/error";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
export default function ProfilePage() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const session = useSession();
  if (session.status === "unauthenticated") {
    redirect("/login");
  }
  const fetcher = async () => {
    const response = await axios.get("/api/profile");
    return response.data;
  };

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
      label: "Menu",
      content: <MenuItemTab />,
    },
    {
      id: "Users",
      label: "Users",
      content: <UsersTab />,
    },
    {
      id: "Orders",
      label: "Orders",
      content: <OrdersTab />,
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
            <Tabs
              aria-label="Dynamic tabs"
              items={tabs}
              size={isSmallScreen ? "sm" : "md"}
            >
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
              <Tab key={tabs[4].id} title={tabs[4].label}>
                <Card>
                  <CardBody>{tabs[4].content}</CardBody>
                </Card>
              </Tab>
            </Tabs>
          )}
        </section>
      )}
    </>
  );
}
