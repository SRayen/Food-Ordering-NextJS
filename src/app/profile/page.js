"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Loading from "../loading";
import axios from "axios";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";

import ProfileTab from "@/components/layout/profile_components/ProfileTab";
export default function ProfilePage() {
  const session = useSession();

  const [user, setUser] = useState({});
  useEffect(() => {
    if (session.status === "authenticated") {
      const fetch = async () => {
        const response = await axios.get("/api/profile");
        response.data;
        setUser(response.data);
      };
      fetch();
    }
  }, [session.status, session?.data?.user?.image, session?.data?.user?.name]);

  let tabs = [
    {
      id: "Profile",
      label: "Profile",
      content: <ProfileTab user={user} />,
    },
    {
      id: "Menu",
      label: "Menu Items",
      content: <ProfileTab />,
    },
    {
      id: "Users",
      label: "Users",
      content: <ProfileTab />,
    },
  ];

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
